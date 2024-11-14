import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        {
            "id": 1,
            "name": "rexxy",
            "email": "rexxy@abc.com",
            "role": "USER"
        },
        {
            "id": 2,
            "name": "Akku",
            "email": "Akku@abc.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Shevait",
            "email": "Shevait@abc.com",
            "role": "ADMIN"
        },
        {
            "id": 4,
            "name": "ishaan",
            "email": "ishaan@abc.com",
            "role": "USER"
        },
        {
            "id": 5,
            "name": "ujju",
            "email": "ujju@abc.com",
            "role": "CLIENT"
        },
        {
            "id": 6,
            "name": "shivu",
            "email": "shivu@abc.com",
            "role": "CLIENT"
        },
        {
            "id": 7,
            "name": "renil",
            "email": "renil@abc.com",
            "role": "USER"
        },
    ]


    findAll(role?: 'ADMIN'|'USER'|'CLIENT'){
        if(role){
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException("User Not found")
            return rolesArray 
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if (!user) throw new NotFoundException("User Not Found")
        return user
    }

    create(payload: CreateUserDto){
        const usersByHighestId = [...this.users].sort((a,b)=> b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...payload
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, payload: UpdateUserDto){
        this.users = this.users.map(user => {
            if(user.id === id){
                return {...user, ...payload}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
