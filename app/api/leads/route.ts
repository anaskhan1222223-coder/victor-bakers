import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.phone) {
      return NextResponse.json(
        {
          success: false,
          error: "Name and phone number are required",
        },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("bakery");

    const result = await db.collection("leads").insertOne({
      ...body,
      status: "new",
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}