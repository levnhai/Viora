import * as crypto from 'crypto';
import { AuthService } from './auth.service';

describe('AuthService Password Hashing & Verification', () => {
  let authService: AuthService;

  beforeEach(() => {
    // We only test hashing and verification methods here, mock models/services
    authService = new AuthService(
      {} as any,
      {} as any,
      { get: jest.fn().mockReturnValue('test_secret') } as any,
      { sign: jest.fn() } as any,
    );
  });

  describe('hashPassword', () => {
    it('should generate a valid bcrypt hash starting with $2a$ or $2b$', async () => {
      const plainPassword = 'SuperSecretPassword@123';
      const hash = await authService.hashPassword(plainPassword);

      expect(hash).toBeDefined();
      expect(hash.length).toBe(60);
      expect(hash.startsWith('$2a$') || hash.startsWith('$2b$')).toBe(true);
    });

    it('should generate different salts for the same password', async () => {
      const plainPassword = 'SamePassword123';
      const hash1 = await authService.hashPassword(plainPassword);
      const hash2 = await authService.hashPassword(plainPassword);

      expect(hash1).not.toEqual(hash2);
    });
  });

  describe('verifyPassword', () => {
    it('should return true for correct password with bcrypt hash', async () => {
      const plainPassword = 'MySecurePassword!';
      const hash = await authService.hashPassword(plainPassword);

      const isValid = await authService.verifyPassword(plainPassword, hash);
      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password with bcrypt hash', async () => {
      const plainPassword = 'MySecurePassword!';
      const hash = await authService.hashPassword(plainPassword);

      const isValid = await authService.verifyPassword('WrongPassword', hash);
      expect(isValid).toBe(false);
    });

    it('should return true for correct password with legacy SHA-256 hash (Backward Compatibility)', async () => {
      const plainPassword = 'LegacyPassword2025';
      const legacySha256Hash = crypto
        .createHash('sha256')
        .update(plainPassword)
        .digest('hex');

      const isValid = await authService.verifyPassword(
        plainPassword,
        legacySha256Hash,
      );
      expect(isValid).toBe(true);
    });

    it('should return false for incorrect password with legacy SHA-256 hash', async () => {
      const plainPassword = 'LegacyPassword2025';
      const legacySha256Hash = crypto
        .createHash('sha256')
        .update(plainPassword)
        .digest('hex');

      const isValid = await authService.verifyPassword(
        'WrongPassword',
        legacySha256Hash,
      );
      expect(isValid).toBe(false);
    });

    it('should return false if storedHash is empty or undefined', async () => {
      expect(await authService.verifyPassword('password', '')).toBe(false);
      expect(await authService.verifyPassword('password', null as any)).toBe(
        false,
      );
    });
  });
});
