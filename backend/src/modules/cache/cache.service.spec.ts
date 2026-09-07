import { AppCacheService } from './cache.service';

describe('AppCacheService', () => {
  let service: AppCacheService;
  let mockCacheManager: any;

  beforeEach(() => {
    mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
      reset: jest.fn(),
    };
    service = new AppCacheService(mockCacheManager);
  });

  it('get: trả về dữ liệu khi cache hit', async () => {
    const mockData = { id: 1, name: 'Wedding Test' };
    mockCacheManager.get.mockResolvedValue(mockData);

    const result = await service.get('wedding:render:test');
    expect(mockCacheManager.get).toHaveBeenCalledWith('wedding:render:test');
    expect(result).toEqual(mockData);
  });

  it('get: trả về undefined khi cache miss', async () => {
    mockCacheManager.get.mockResolvedValue(null);

    const result = await service.get('wedding:render:not-exist');
    expect(result).toBeUndefined();
  });

  it('get: bắt lỗi an toàn và trả về undefined khi cacheManager gặp sự cố', async () => {
    mockCacheManager.get.mockRejectedValue(new Error('Connection lost'));

    const result = await service.get('any-key');
    expect(result).toBeUndefined();
  });

  it('set: gọi cacheManager.set đúng key, value và ttl', async () => {
    await service.set('test-key', { foo: 'bar' }, 60000);
    expect(mockCacheManager.set).toHaveBeenCalledWith(
      'test-key',
      { foo: 'bar' },
      60000,
    );
  });

  it('set: không crash khi cacheManager.set gặp lỗi', async () => {
    mockCacheManager.set.mockRejectedValue(new Error('Write failed'));
    await expect(
      service.set('error-key', 'value', 1000),
    ).resolves.not.toThrow();
  });

  it('del: gọi cacheManager.del đúng key', async () => {
    await service.del('wedding:render:test-slug');
    expect(mockCacheManager.del).toHaveBeenCalledWith(
      'wedding:render:test-slug',
    );
  });

  it('reset: gọi cacheManager.reset', async () => {
    await service.reset();
    expect(mockCacheManager.reset).toHaveBeenCalled();
  });
});
