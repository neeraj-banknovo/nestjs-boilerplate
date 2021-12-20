// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   Inject,
//   HttpException,
//   HttpStatus,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// import { AuthService } from '../../services';
// import { get } from 'lodash';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     @Inject('AuthService') private authService: AuthService,
//     private reflector: Reflector,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     // const roles = this.reflector.get<string[]>('roles', context.getHandler());

//     const authHeader = get(request, 'headers.authorization', '');
//     const token = authHeader.replace(new RegExp(/^bearer/i), '').trim();

//     try {
//       const authDetails = await this.authService.validateTokenAsync(token);
//       request.principal = authDetails;
//     } catch (error) {
//       throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
//     }
//     return true;
//   }
// }
