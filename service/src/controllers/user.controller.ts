import { Body, Controller, Post, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthenticationService } from '../services/auth.service';

@Controller('users')
export class UserController{
    constructor(private readonly authService: AuthenticationService) {}

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    loginUser(@Body() loginUserDto: Record<string, any>): Promise<any> {
        return this.authService.login(loginUserDto.username, loginUserDto.password);
    }
    // loginUser(@Body() loginUserDto: Record<string, any>): Promise<any> {
    //     return this.userService.login(loginUserDto.username, loginUserDto.password);
    // }
}