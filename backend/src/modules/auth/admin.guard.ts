import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (!['admin', 'staff'].includes(request.user?.role)) {
      throw new ForbiddenException('Bạn không có quyền quản trị');
    }
    return true;
  }
}
