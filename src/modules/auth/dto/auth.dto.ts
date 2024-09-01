import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, } from "class-validator";

export class SignUpDto {

    @MinLength(2)
    @MaxLength(10)
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsString()
    password:string;
}

export class signInDto{

    @MinLength(3)
    @IsString()	
    @IsEmail()
    email:string;

    @MinLength(3)
    @IsString()	
    @IsNotEmpty()
    password:string;
}