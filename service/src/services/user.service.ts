import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/models/user.entity";
import { Repository } from "typeorm";
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        // private readonly jwtService: JwtService
    ){}
    
    async findUser(username: string) {
        return this.userRepository.findOneBy({ username });
    }
}