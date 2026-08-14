import { UsersController } from './users.controller';
import { UsersService } from './users.service';

/* Controller-ийн үүрэг зөвхөн параметр дамжуулах (route → service) — @Roles()/
   @UseGuards()-ийн бодит эрхийн шалгалт RolesGuard.spec.ts-д аль хэдийн бодитоор
   шалгагдсан. Энд зөвхөн "зөв method-ыг зөв аргументаар дуудаж байгаа" гэдгийг
   баталгаажуулна — route wiring регресс орж ирвэл эндээс барина. */
describe('UsersController', () => {
  let controller: UsersController;
  let service: jest.Mocked<UsersService>;
  const authUser = { userId: 'u1', email: 'x@x.com', role: 'USER' } as never;

  beforeEach(() => {
    service = {
      list: jest.fn(),
      create: jest.fn(),
      updateProfile: jest.fn(),
      changePassword: jest.fn(),
      subscribe: jest.fn(),
      cancelSubscription: jest.fn(),
      setSubscriptionFor: jest.fn(),
      remove: jest.fn(),
      updateRole: jest.fn(),
      updateStatus: jest.fn(),
      resetPassword: jest.fn(),
      listSessions: jest.fn(),
      revokeSessions: jest.fn(),
    } as unknown as jest.Mocked<UsersService>;
    controller = new UsersController(service);
  });

  it('list() delegates to service.list()', () => {
    controller.list();
    expect(service.list).toHaveBeenCalled();
  });

  it('create() forwards the DTO', () => {
    const dto = { name: 'X', email: 'x@x.com', password: 'aaaaaa', role: 'ARTIST' } as never;
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('updateProfile() uses the current user id, not a route param (self-service only)', () => {
    const dto = { name: 'New Name' } as never;
    controller.updateProfile(authUser, dto);
    expect(service.updateProfile).toHaveBeenCalledWith('u1', dto);
  });

  it('changePassword() forwards to the current user', () => {
    const dto = { currentPassword: 'a', newPassword: 'b' } as never;
    controller.changePassword(authUser, dto);
    expect(service.changePassword).toHaveBeenCalledWith('u1', dto);
  });

  it('subscribe() defaults to МЭДРЭХ PRO when no plan is specified', () => {
    controller.subscribe(authUser, {} as never);
    expect(service.subscribe).toHaveBeenCalledWith('u1', 'МЭДРЭХ PRO');
  });

  it('subscribe() uses the provided plan when specified', () => {
    controller.subscribe(authUser, { plan: 'Custom Plan' } as never);
    expect(service.subscribe).toHaveBeenCalledWith('u1', 'Custom Plan');
  });

  it('cancelSubscription() targets the current user', () => {
    controller.cancelSubscription(authUser);
    expect(service.cancelSubscription).toHaveBeenCalledWith('u1');
  });

  it('setSubscriptionFor() forwards the target id and admin-provided fields', () => {
    controller.setSubscriptionFor('target-1', { active: true, plan: 'PRO' } as never);
    expect(service.setSubscriptionFor).toHaveBeenCalledWith('target-1', true, 'PRO');
  });

  it('remove() forwards target id and requester id', () => {
    controller.remove('target-1', authUser);
    expect(service.remove).toHaveBeenCalledWith('target-1', 'u1');
  });

  it('updateRole() forwards target id, DTO, and requester id', () => {
    const dto = { role: 'CURATOR' } as never;
    controller.updateRole('target-1', dto, authUser);
    expect(service.updateRole).toHaveBeenCalledWith('target-1', 'u1', dto);
  });

  it('updateStatus() forwards target id, DTO, and requester id', () => {
    const dto = { status: 'BANNED' } as never;
    controller.updateStatus('target-1', dto, authUser);
    expect(service.updateStatus).toHaveBeenCalledWith('target-1', 'u1', dto);
  });

  it('resetPassword() forwards target id and requester id', () => {
    controller.resetPassword('target-1', authUser);
    expect(service.resetPassword).toHaveBeenCalledWith('target-1', 'u1');
  });

  it('listSessions() forwards the target id only', () => {
    controller.listSessions('target-1');
    expect(service.listSessions).toHaveBeenCalledWith('target-1');
  });

  it('revokeSessions() forwards the target id only', () => {
    controller.revokeSessions('target-1');
    expect(service.revokeSessions).toHaveBeenCalledWith('target-1');
  });
});
