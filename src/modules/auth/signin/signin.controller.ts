import { Body, Controller, Post } from '@nestjs/common';
import { signInDto } from '../dto/auth.dto';
import { SigninService } from './signin.service';

@Controller('signin')
export class SigninController {

    constructor(private signinServ: SigninService) {}

    @Post()
    async signIn(@Body() body: signInDto) {
        return await this.signinServ.signIn(body);
    }
}
