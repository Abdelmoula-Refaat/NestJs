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


    signIn = async(acc:signInDto) => {

       let emailExsist = await this.userModel.findOne({email: acc.email})

       if(emailExsist){


        const match = await bcrypt.compare(acc.password,emailExsist.password)
        if(match){
            let token = this.jwtService.sign({name:User.name},{secret:'stitsh'}) 
         return {message:'Login Successfully',token}
        }
        else{
            throw new HttpException("Wrong Password",HttpStatus.BAD_REQUEST)
        }
       }

       else {
        throw new HttpException("Wrong Email",HttpStatus.BAD_REQUEST) 
       }
    }
}