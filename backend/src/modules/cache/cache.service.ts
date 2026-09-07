import { Injectable, Inject, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class AppCacheService {
  private readonly logger = new Logger(AppCacheService.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  /**
   * Lấy dữ liệu từ cache theo key
   */
  async get<T>(key: string): Promise<T | undefined> {
    try {
      const val = await this.cacheManager.get<T>(key);
      return val ?? undefined;
    } catch (err: any) {
      this.logger.warn(`Lỗi đọc cache [${key}]: ${err?.message}`);
      return undefined;
    }
  }

  /**
   * Lưu dữ liệu vào cache với thời gian tồn tại (ttlMs tính bằng mili-giây)
   */
  async set(key: string, value: any, ttlMs?: number): Promise<void> {
    try {
      await this.cacheManager.set(key, value, ttlMs);
    } catch (err: any) {
      this.logger.warn(`Lỗi ghi cache [${key}]: ${err?.message}`);
    }
  }

  /**
   * Xóa một key khỏi cache
   */
  async del(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (err: any) {
      this.logger.warn(`Lỗi xóa cache [${key}]: ${err?.message}`);
    }
  }

  /**
   * Xóa toàn bộ cache
   */
  async reset(): Promise<void> {
    try {
      if (typeof (this.cacheManager as any).reset === 'function') {
        await (this.cacheManager as any).reset();
      }
    } catch (err: any) {
      this.logger.warn(`Lỗi reset cache: ${err?.message}`);
    }
  }
}
