// import { Injectable } from '@nestjs/common';
// import * as okta from '@okta/jwt-verifier';
// import * as crypto from 'crypto';
// import { InjectRepository } from '@nestjs/typeorm';

// import { UserRepository } from '../../repositories';
// import { User } from '../../entities';

// import { get } from 'lodash';
// import { AuthDetails } from '../../dto';
// import { authConfig } from '../../../config/config';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(UserRepository)
//     private readonly userRepository: UserRepository,
//   ) {}
//   /**
//    * Validates an Okta Access Token
//    * @param token the bearer token to validate
//    * @returns a Promise resolving to a unique property representing the user
//    */
//   async validateTokenAsync(token: string): Promise<any> {
//     const verifier = new okta({
//       issuer: authConfig().domain,
//     });

//     if (!token) {
//       throw new Error('Missing auth header');
//     }
//     const jwt = await verifier.verifyAccessToken(token, authConfig().audience);
//     // the token is valid
//     const role: undefined | string = get(jwt, 'claims.groups', [])[0];

//     const user = await this.userRepository.upsertUserAsync({
//       name: 'Dummy',
//       externalId: jwt.claims['uid'],
//       email: crypto.createHash('md5').update(jwt.claims['sub']).digest('hex'),
//     } as Partial<User>);
//     return new AuthDetails(user.id, role);
//   }
// }
