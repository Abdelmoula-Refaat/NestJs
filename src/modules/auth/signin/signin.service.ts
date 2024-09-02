import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signInDto } from '../dto/auth.dto';
import { User } from 'src/core/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SigninService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signIn(acc: signInDto) {
        const user = await this.userModel.findOne({ email: acc.email });

        if (user) {
            const match = await bcrypt.compare(acc.password, user.password);
            if (match) {
                
                const token = this.jwtService.sign(
                    { userId: user._id, email: user.email },
                    { secret: 'your-secret-key', expiresIn: '1h' }
                );
                return { message: 'Login Successfully', token };
            } else {
                throw new HttpException('Wrong Password', HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException('Wrong Email', HttpStatus.BAD_REQUEST);
        }
    }
}
