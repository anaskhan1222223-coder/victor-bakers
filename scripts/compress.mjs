import sharp from "sharp";
import fs from "fs";
import path from "path";

const dir = "public/images";

for (const file of fs.readdirSync(dir)) {
  if (!file.endsWith(".jpg")) continue;
  const src = path.join(dir, file);
  await sharp(src)
    .resize({ width: 800 })
    .jpeg({ quality: 70, mozjpeg: true })
    .toFile(src + ".tmp");
  fs.renameSync(src + ".tmp", src);
  console.log("✅ compressed", file);
}