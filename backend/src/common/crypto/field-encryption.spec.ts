import { encryptField, decryptField } from './field-encryption';

describe('field-encryption', () => {
  const secret = 'test-secret-key-not-for-production';

  it('round-trips a plaintext value', () => {
    const encrypted = encryptField('sensitive hearing profile text', secret);
    expect(encrypted).not.toBe('sensitive hearing profile text');
    expect(decryptField(encrypted, secret)).toBe('sensitive hearing profile text');
  });

  it('produces a different ciphertext each time (random IV)', () => {
    const a = encryptField('same input', secret);
    const b = encryptField('same input', secret);
    expect(a).not.toBe(b);
  });

  it('fails to decrypt with the wrong key', () => {
    const encrypted = encryptField('secret text', secret);
    expect(() => decryptField(encrypted, 'wrong-key')).toThrow();
  });

  it('passes through legacy plaintext (pre-encryption migration) untouched', () => {
    expect(decryptField('plain old text', secret)).toBe('plain old text');
  });
});
