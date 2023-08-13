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

    async sortFilterTodos(filters: {
        title?: string;
        status?: string;
        createdAt?: string;
        dueDate?: string;
    }) {
        const { title, status, createdAt, dueDate } = filters;

        const where = {};
        const orderBy = {};

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

    async searchTitleTodos(title: string) {
        return this.sortFilterTodos({ title });
    }

    async filterStatusTodos(status: string) {
        return this.sortFilterTodos({ status });
    }

    async sortingTodos(createdAt: string, dueDate: string) {
        return this.sortFilterTodos({ createdAt, dueDate });
    }
}
