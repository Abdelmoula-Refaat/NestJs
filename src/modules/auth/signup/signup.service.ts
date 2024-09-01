import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from '../dto/auth.dto';
import { User } from 'src/core/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SignupService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async signUp(body:SignUpDto) {
        let user = await this.userModel.findOne({email:body.email})
        if (user) throw new HttpException('email already register',HttpStatus.CONFLICT);
        body.password = await bcrypt.hash(body.password,8);
        let addedUser = await this.userModel.insertMany(body)
        return {message:"success" , addedUser}
    }
}
