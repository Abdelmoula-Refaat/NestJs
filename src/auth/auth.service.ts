import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private users = [];

  signup(signupDto: SignupDto) {
    const { username, password } = signupDto;
    const user = { id: this.users.length + 1, username, password };
    this.users.push(user);
    return { msg: 'User registered successfully' };
  }

  signin(signinDto: SigninDto) {
    const { username, password } = signinDto;
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return { msg: 'User signed in successfully' };
  }
}

