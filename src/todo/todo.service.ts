import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTodoDto, UpdateTodoDto } from "./dto";

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {}

    async createTodo(createTodoDto: CreateTodoDto) {
        return this.prisma.todo.create({data: createTodoDto});
    }

    async getTodo(id: number) {
        return this.prisma.todo.findUnique({where: {id}});
    }

    async getAllTodo() {
        return this.prisma.todo.findMany();
    }

    async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
        return this.prisma.todo.update({where: {id}, data: updateTodoDto});
    }

    async deleteTodo(id: number) {
        return this.prisma.todo.delete({where: {id}});
    }

    async changeStatus(id: number) {
        const updateTodoDto = await this.getTodo(id);
        updateTodoDto.completed = !updateTodoDto.completed
        return this.prisma.todo.update({where: {id}, data: updateTodoDto});
    }
}
