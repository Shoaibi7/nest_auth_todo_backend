import { Injectable, NestMiddleware } from '@nestjs/common';
import {Request} from 'express';

@Injectable()
export class TodomiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    console.log('here in todo middleware',req?.path)
    next();
  }
}
