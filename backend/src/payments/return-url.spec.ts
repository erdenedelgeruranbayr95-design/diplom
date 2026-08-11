import { BadRequestException } from '@nestjs/common';
import { resolveReturnUrl, appendParams } from './return-url';

/* `returnUrl` бол клиентээс ирдэг цорын ганц URL — шалгалт нь open-redirect-ээс
   хамгаалах ганц хана. Тиймээс энд ЗӨВШӨӨРӨХ болон ТАТГАЛЗАХ хоёуланг нь
   тодорхой тест хийнэ. */
describe('resolveReturnUrl', () => {
  const WEB = 'https://medreh.mn';

  it('зөвшөөрөгдсөн вэб origin-ыг нэвтрүүлнэ', () => {
    expect(resolveReturnUrl(`${WEB}/player`, WEB, WEB)).toEqual({ url: `${WEB}/player`, isDeepLink: false });
  });

  it('CORS_ORIGIN дахь ОЛОН хаягийн аль нэгийг нь хүлээж авна', () => {
    const allowed = 'https://medreh.mn, http://localhost:3001';
    expect(resolveReturnUrl('http://localhost:3001/x', allowed, WEB).url).toBe('http://localhost:3001/x');
  });

  it('аппын deep link-ийг зөвшөөрч, deep link гэж тэмдэглэнэ', () => {
    expect(resolveReturnUrl('medreh:///', WEB, WEB)).toEqual({ url: 'medreh:///', isDeepLink: true });
  });

  it('returnUrl байхгүй бол fallback-ыг буцаана', () => {
    expect(resolveReturnUrl(undefined, WEB, WEB)).toEqual({ url: WEB, isDeepLink: false });
  });

  /* --- Татгалзах ёстой тохиолдлууд --- */

  it('ГАДНЫ origin-ыг татгалзана (open redirect)', () => {
    expect(() => resolveReturnUrl('https://evil.example/pay', WEB, WEB)).toThrow(BadRequestException);
  });

  it('ижил домэйны өөр scheme/порт-ыг ч татгалзана', () => {
    expect(() => resolveReturnUrl('http://medreh.mn/x', WEB, WEB)).toThrow(BadRequestException);
    expect(() => resolveReturnUrl('https://medreh.mn:8443/x', WEB, WEB)).toThrow(BadRequestException);
  });

  it('дэд домэйныг ч татгалзана (evil.medreh.mn)', () => {
    expect(() => resolveReturnUrl('https://evil.medreh.mn/x', WEB, WEB)).toThrow(BadRequestException);
  });

  it('javascript: scheme-ийг татгалзана', () => {
    expect(() => resolveReturnUrl('javascript:alert(1)', WEB, WEB)).toThrow(BadRequestException);
  });

  it('URL биш мөрийг татгалзана', () => {
    expect(() => resolveReturnUrl('/зүгээр зам', WEB, WEB)).toThrow(BadRequestException);
  });

  it('Expo dev scheme-ийг зөвхөн production БИШ үед зөвшөөрнө', () => {
    const expoUrl = 'exp://192.168.1.5:8081/--/';
    expect(resolveReturnUrl(expoUrl, WEB, WEB, false).isDeepLink).toBe(true);
    /* Production-д хост нь дурын байж болох тул хаана — энэ нь open redirect. */
    expect(() => resolveReturnUrl(expoUrl, WEB, WEB, true)).toThrow(BadRequestException);
  });
});

describe('appendParams', () => {
  it('query байхгүй үед ? ашиглана', () => {
    expect(appendParams('https://a.mn/p', { status: 'success' })).toBe('https://a.mn/p?status=success');
  });

  it('query аль хэдийн байвал & ашиглана', () => {
    expect(appendParams('https://a.mn/p?x=1', { status: 'cancel' })).toBe('https://a.mn/p?x=1&status=cancel');
  });

  it('Stripe-ийн орлуулах тэмдэгтийг ЭВДЭХГҮЙ (encode хийхгүй)', () => {
    /* `{CHECKOUT_SESSION_ID}`-ийн хаалт encode хийгдвэл Stripe орлуулахаа болино. */
    const out = appendParams('https://a.mn/', { session_id: '{CHECKOUT_SESSION_ID}' });
    expect(out).toContain('{CHECKOUT_SESSION_ID}');
  });

  it('hash-ыг төгсгөлд нь хадгална', () => {
    expect(appendParams('https://a.mn/p#top', { status: 'success' })).toBe('https://a.mn/p?status=success#top');
  });
});
