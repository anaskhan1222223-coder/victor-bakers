import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ---------- Simple per-IP rate limiter ----------
const RATE_LIMIT = 5;                    // max submissions
const RATE_WINDOW = 10 * 60 * 1000;      // per 10 minutes
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  if (hits.size > 5000) hits.clear();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// Trim + cap any string so nothing huge enters the DB
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    // 1) Block oversized payloads (~50 KB max)
    const length = Number(request.headers.get("content-length") ?? 0);
    if (length > 50_000) {
      return NextResponse.json(
        { success: false, error: "Payload too large" },
        { status: 413 }
      );
    }

    // 2) Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 3) Honeypot — real humans never fill hidden bot fields
    if (body.website || body.company) {
      return NextResponse.json({ success: true, id: "ignored" }); // lie to the bot
    }

    // 4) Whitelist + validate fields (NEVER spread raw body)
    const name = clean(body.name, 80);
    const phone = clean(body.phone, 10);
    const cakeType = clean(body.cakeType, 60);
    const flavour = clean(body.flavour, 60);
    const weight = clean(body.weight, 30);
    const occasion = clean(body.occasion, 60);
    const date = clean(body.date, 20);
    const message = clean(body.message, 600);
    const source = clean(body.source, 40);

    if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name and 10-digit mobile number." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bakery");

    const result = await db.collection("leads").insertOne({
      name,
      phone,
      cakeType,
      flavour,
      weight,
      occasion,
      date,
      message,
      source: source || "website",
      eggless: Boolean(body.eggless),
      hasReferenceImage: Boolean(body.hasReferenceImage),
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch {
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}