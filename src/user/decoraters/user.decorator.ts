import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  // data allows us to get a specific value of our decorator (in e.g. our user entity specific column)
  const request = ctx.switchToHttp().getRequest();

  if (!request.user) {
    null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
