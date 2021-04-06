import { AxiosError } from 'axios';
import { Middleware } from 'src/types/koa';
import { ValidationError } from 'yup';

const isAxiosError = (error: unknown): error is AxiosError =>
  !!(error as AxiosError).isAxiosError;

export const errorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      ctx.throw(err.response?.status || 500, err.response?.data.status || '');
    } else if (err instanceof ValidationError) {
      ctx.throw(400, err.message);
    }
    ctx.throw(500);
  }
};
