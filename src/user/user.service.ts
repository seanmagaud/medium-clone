import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserEntity } from "@app/user/user.entity";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@app/config";
import { UserResponseInterface } from "./types/userResponse.interface";
import { LoginUserDto } from "./dto/loginUser.dto";
import { compare } from "bcrypt"
import { UpdateUserDto } from "./dto/updateUser.dto";

@Injectable() // injectable is how we tell nestjs this is a class that can have dependencies that should be instantiated by Nest and its DI system
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository: Repository<UserEntity>,
    ) {}
    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        if (await this.userRepository.findOne({username: createUserDto.username})){
            throw new HttpException('Username already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        if (await this.userRepository.findOne({email: createUserDto.email})) {
            throw new HttpException('Email already taken', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto); // https://docs.nestjs.com/techniques/serialization

        return await this.userRepository.save(newUser);
    }

    async findById(id: number): Promise <UserEntity> { // to inject on AuthMiddleware
        return this.userRepository.findOne(id);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne(
            {
                email : loginUserDto.email
            }, 
            {
                select : ['id', 'username', 'email', 'bio', 'image', 'password'] // step 2 select is used the columns we need (in e.g. password to compare if matching w bcrypt) 
            }
        );
        
        if (!user) {
            throw new HttpException('Email dont exist', HttpStatus.UNPROCESSABLE_ENTITY);
        }

        if (!await compare(loginUserDto.password, user.password)) {
             throw new HttpException('Password not valid', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        delete user.password; // step 3 we can delete some columns as the password on return response

        return user;
    }

    async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(userId);
        Object.assign(user, updateUserDto);

        return await this.userRepository.save(user);
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JWT_SECRET);
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
}