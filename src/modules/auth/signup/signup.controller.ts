import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignUpDto } from '../dto/auth.dto';

@Controller('signup')
export class SignupController {
    constructor (private _SignupService:SignupService){
        
    }
    @Post()
    signUp( @Body() body: SignUpDto) {
        return this._SignupService.signUp(body)
    }
}
