import { NestFactory } from '@nestjs/core';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AppModule } from '../../app.module';
import { Template, TemplateDocument } from './schemas/template.schema';
import { DEFAULT_TEMPLATES } from './template.data';

async function bootstrap() {
  console.log('⏳ Khởi tạo NestJS Application Context...');

  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const templateModel = app.get<Model<TemplateDocument>>(
      getModelToken(Template.name),
    );

    console.time('🚀 Seed Templates');

    const codes = DEFAULT_TEMPLATES.map((t) => t.code);

    await templateModel.bulkWrite(
      DEFAULT_TEMPLATES.map((template) => ({
        updateOne: {
          filter: { code: template.code },
          update: {
            $set: template,
          },
          upsert: true,
        },
      })),
    );

    // Xóa các template không còn tồn tại trong template.data.ts
    const deleteResult = await templateModel.deleteMany({
      code: {
        $nin: codes,
      },
    });

    console.timeEnd('🚀 Seed Templates');

    console.log(`✅ Đồng bộ ${DEFAULT_TEMPLATES.length} templates.`);
    console.log(
      `🗑 Đã xóa ${deleteResult.deletedCount} template không còn sử dụng.`,
    );
  } catch (error) {
    console.error('❌ Seed Templates thất bại!', error);
    process.exitCode = 1;
  } finally {
    await app.close();
  }
}

bootstrap();
