import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from "./user.service"
import { error } from 'console';
import { type } from 'os';

@Injectable()
export class AuthenticationService {

    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(username: string, password: string) {
        const user = await this.userService.findUser(username)
        
        if (user === null) {
            return {"message": "No user found with username " + username}
        }

        if (user.password !== password) {
            return {"message": "Password is incorect!"}
        }

        const payload = {username: user.username, id: user.id, email: user.email}

        return {
            "access_token": await this.jwtService.signAsync(payload)
        }
    }

    getTokenFromString(token: string) {
        return token.substring(7, token.length)
    }

    async isTokenValid(token: string) {
        let verifiedResult = await this.getToken(token);
        
        if (verifiedResult !== null) {
            console.log("PECE");
            return true
        }
        
        return false
    }

    async getToken(token: string) {
        token = this.getTokenFromString(token)
        let result: any
        try {
            result = this.jwtService.verify(token);
        } catch(err) {
            return null;
        }

        return result 
    }
}