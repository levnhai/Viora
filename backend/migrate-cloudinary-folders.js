const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const mongoUri = process.env.MONGO_URI;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const baseFolder = process.env.CLOUDINARY_FOLDER || 'thiepmoionline';

if (!mongoUri || !cloudName || !apiKey || !apiSecret) {
  console.error('Thiếu cấu hình MongoDB hoặc Cloudinary trong .env');
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

async function migrate() {
  console.log('🚀 Đang kết nối tới MongoDB...');
  await mongoose.connect(mongoUri);
  console.log('✅ Đã kết nối MongoDB thành công!');
  const db = mongoose.connection.db;

  const weddings = await db.collection('weddings').find({ deletedAt: null }).toArray();
  console.log(`📌 Tìm thấy ${weddings.length} thiệp cưới trong hệ thống.`);

  for (const wedding of weddings) {
    const slug = wedding.slug;
    if (!slug) continue;

    console.log(`\n--------------------------------------------------`);
    console.log(`💍 Đang xử lý thiệp cưới: "${slug}" (ID: ${wedding._id})`);

    const targetFolder = `${baseFolder}/${slug}`;
    const allUrlsToProcess = new Set();

    if (Array.isArray(wedding.galleryImages)) {
      wedding.galleryImages.forEach(url => url && allUrlsToProcess.add(url));
    }
    if (wedding.coverImage) allUrlsToProcess.add(wedding.coverImage);
    if (wedding.heroImage) allUrlsToProcess.add(wedding.heroImage);
    if (wedding.groomAvatarUrl) allUrlsToProcess.add(wedding.groomAvatarUrl);
    if (wedding.brideAvatarUrl) allUrlsToProcess.add(wedding.brideAvatarUrl);
    if (wedding.seo && wedding.seo.ogImage) allUrlsToProcess.add(wedding.seo.ogImage);

    // Cũng lấy tất cả Media từ collection medias
    const mediaDocs = await db.collection('medias').find({ weddingId: wedding._id, deletedAt: null }).toArray();
    mediaDocs.forEach(m => m.url && allUrlsToProcess.add(m.url));

    console.log(`🔍 Tìm thấy ${allUrlsToProcess.size} URLs ảnh liên quan tới thiệp "${slug}".`);

    const urlReplacementMap = new Map();

    for (const oldUrl of allUrlsToProcess) {
      if (!oldUrl.includes('res.cloudinary.com')) continue;

      // Extract current public_id
      // Format: https://res.cloudinary.com/dynrs5wzt/image/upload/v1784617335/thiepmoionline/gallerys/jjvqmw5qflbtiztbvzid.jpg
      const match = oldUrl.match(/\/upload\/(?:v\d+\/)?(.+?)\.([a-zA-Z0-9]+)$/);
      if (!match) continue;

      const oldPublicId = match[1];
      const ext = match[2];

      // If already in targetFolder (e.g. thiepmoionline/leminhan-nguyenkhanhyen-240825/...), skip
      if (oldPublicId.startsWith(`${targetFolder}/`)) {
        console.log(`   └─ Ảnh [${oldPublicId}] đã ở đúng vị trí [${targetFolder}]. Skipping.`);
        continue;
      }

      // Get filename
      const parts = oldPublicId.split('/');
      const filenameOnly = parts[parts.length - 1];
      const newPublicId = `${targetFolder}/${filenameOnly}`;

      console.log(`   🔄 Đang di chuyển trên Cloudinary: ${oldPublicId} ➔ ${newPublicId}`);

      try {
        const renameResult = await cloudinary.uploader.rename(oldPublicId, newPublicId, {
          overwrite: true,
        });

        const newUrl = renameResult.secure_url;
        console.log(`   ✅ Di chuyển thành công! URL mới: ${newUrl}`);
        urlReplacementMap.set(oldUrl, newUrl);

        // Cập nhật hoặc tạo mới bản ghi Media
        await db.collection('medias').updateOne(
          { url: oldUrl },
          {
            $set: {
              url: newUrl,
              filename: newPublicId,
              weddingId: wedding._id,
              ownerId: wedding.ownerId,
              updatedAt: new Date(),
            },
          },
          { upsert: false }
        );
      } catch (err) {
        console.error(`   ❌ Lỗi khi di chuyển ảnh [${oldPublicId}]:`, err.message || err);
      }
    }

    if (urlReplacementMap.size > 0) {
      console.log(`\n   📝 Cập nhật lại các liên kết trong DB cho thiệp "${slug}"...`);
      const updateQuery = {};

      if (Array.isArray(wedding.galleryImages)) {
        const updatedGallery = wedding.galleryImages.map(u => urlReplacementMap.get(u) || u);
        updateQuery.galleryImages = updatedGallery;
      }
      if (wedding.coverImage && urlReplacementMap.has(wedding.coverImage)) {
        updateQuery.coverImage = urlReplacementMap.get(wedding.coverImage);
      }
      if (wedding.heroImage && urlReplacementMap.has(wedding.heroImage)) {
        updateQuery.heroImage = urlReplacementMap.get(wedding.heroImage);
      }
      if (wedding.groomAvatarUrl && urlReplacementMap.has(wedding.groomAvatarUrl)) {
        updateQuery.groomAvatarUrl = urlReplacementMap.get(wedding.groomAvatarUrl);
      }
      if (wedding.brideAvatarUrl && urlReplacementMap.has(wedding.brideAvatarUrl)) {
        updateQuery.brideAvatarUrl = urlReplacementMap.get(wedding.brideAvatarUrl);
      }
      if (wedding.seo && wedding.seo.ogImage && urlReplacementMap.has(wedding.seo.ogImage)) {
        updateQuery['seo.ogImage'] = urlReplacementMap.get(wedding.seo.ogImage);
      }

      await db.collection('weddings').updateOne({ _id: wedding._id }, { $set: updateQuery });
      console.log(`   ✅ Đã cập nhật xong MongoDB cho thiệp "${slug}"!`);
    }
  }

  console.log(`\n==================================================`);
  console.log(`🎉 HOÀN TẤT TOÀN BỘ QUÁ TRÌNH DI CHUYỂN FOLDER CLOUDINARY!`);
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Lỗi khi chạy migration:', err);
  process.exit(1);
});
