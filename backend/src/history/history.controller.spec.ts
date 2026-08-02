import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

describe('HistoryController', () => {
  let controller: HistoryController;
  let service: jest.Mocked<HistoryService>;
  const authUser = { userId: 'u1', email: 'x@x.com', role: 'USER' } as never;

  beforeEach(() => {
    service = { log: jest.fn(), list: jest.fn(), remove: jest.fn() } as unknown as jest.Mocked<HistoryService>;
    controller = new HistoryController(service);
  });

  it('log() forwards the current user id and DTO', () => {
    const dto = { songId: 's1' } as never;
    controller.log(dto, authUser);
    expect(service.log).toHaveBeenCalledWith('u1', dto);
  });

  it('list() forwards the current user id and query', () => {
    const q = { page: 2 } as never;
    controller.list(q, authUser);
    expect(service.list).toHaveBeenCalledWith('u1', q);
  });

  it('remove() forwards id, requester id, and role', () => {
    controller.remove('h1', authUser);
    expect(service.remove).toHaveBeenCalledWith('h1', 'u1', 'USER');
  });
});
