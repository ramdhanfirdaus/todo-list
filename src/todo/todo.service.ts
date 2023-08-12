import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma.service';
import {CreateTodoDto, UpdateTodoDto} from './dto';

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {
    }

    async createTodo(createTodoDto: CreateTodoDto) {
        return this.prisma.todo.create({data: createTodoDto});
    }

    async getTodo(id: number) {
        return this.prisma.todo.findUnique({where: {id}});
    }

    async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
        return this.prisma.todo.update({where: {id}, data: updateTodoDto});
    }

    async deleteTodo(id: number) {
        return this.prisma.todo.delete({where: {id}});
    }

    async sortFilterTodos(title: string, createdAt: string, status: string, dueDate: string) {
        let where = {};
        let orderBy = {};

        if (title) {
            where['title'] = {
                contains: title,
                mode: 'insensitive',
            };
        }

        if (status !== undefined) {
            where['completed'] = status === 'true';
        }

        if (createdAt) {
            orderBy['createdAt'] = createdAt
        }

        if (dueDate) {
            orderBy['dueDate'] = dueDate
        }

        console.log(where)
        console.log(orderBy)

        return this.prisma.todo.findMany({
            where,
            orderBy,
        });
    }

    async changeStatus(id: number) {
        const updateTodoDto = await this.getTodo(id);
        updateTodoDto.completed = !updateTodoDto.completed
        return this.prisma.todo.update({where: {id}, data: updateTodoDto});
    }
}
