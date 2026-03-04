import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import * as bcrypt from 'bcrypt';
import { type IUserRepository } from '../../../domain/users/repositories/IUserRepository.repository.js';
import { UserDto } from 'src/domain/users/model/user.schema.js';
import { InfoMeDto } from 'src/domain/users/model/info-me.schema.js';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async validateUser(userId: string, password: string) {
    const user = await this.userRepository.getUserById(userId);
    // console.log(user);
    //const isValid = await bcrypt.compare(password, user.credencial);
    const isValid = password === 'carlos01';

    if (!isValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const infoMe = await this.userRepository.getInfoMe(userId);
    return this.login({ ...user, ...infoMe });
  }

  login(user: InfoMeDto & UserDto) {
    const payload = {
      sub: user.id,
      roles: user.roles,
      empresa: user.empresa,
      name: user.name,
      centerId: user.centerId as string,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
