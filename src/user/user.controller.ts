import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UserController {
    
    constructor(private readonly userService:UserService){
        
    }

    @Get() // GET /users
    findAll(@Query("role") role?: 'ADMIN'|'USER'|'CLIENT') {
        return this.userService.findAll(role)
    }

    @Get(":id") // GET /users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.userService.findOne(id) // we can use unary plus for converting string into number as findOne(id) expects number as id
    }

    @Post() // POST /users
    create(@Body(ValidationPipe) payload: CreateUserDto){
        return this.userService.create(payload)
    }

    @Patch(":id") // Patch /users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) payload: UpdateUserDto) {
        return this.userService.update(id, payload)
    }

    @Delete(":id") // DELETE /users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.userService.delete(id)
    }
}
