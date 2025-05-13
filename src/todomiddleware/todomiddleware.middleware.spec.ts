import { TodomiddlewareMiddleware } from './todomiddleware.middleware';

describe('TodomiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new TodomiddlewareMiddleware()).toBeDefined();
  });
});
