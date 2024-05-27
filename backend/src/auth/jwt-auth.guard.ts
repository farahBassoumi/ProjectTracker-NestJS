import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './decorators/public.decorator';
import { ROLE } from './decorators/role.decorator';
import { Role } from 'src/members/enum/role.enum';
import { MembersService } from 'src/members/members.service';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly membersService: MembersService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    if (this.isPublic(context)) {
      return true;
    }

    if (!(await super.canActivate(context))) {
      return false;
    }

    const hasRole = this.hasRole(context);

    return hasRole;
  }

  isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  hasRole(context: ExecutionContext) {
    const role = this.reflector.getAllAndOverride<Role | undefined>(ROLE, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!role) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();

    const teamId: string = request.params['id'];
    const { id: userId } = request.user as User;

    return this.membersService.hasRole(teamId, userId, role);
  }
}
