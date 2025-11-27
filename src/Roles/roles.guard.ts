import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';
import { ROLE_KEY } from './roles.decorator';
import { error } from 'console';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredStatus = this.reflector.getAllAndMerge<Role[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();

    if (!user || requiredStatus.some((role) => user.role !== role)) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `You are not authenticated for  this route`,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }

    return true;
  }
}
