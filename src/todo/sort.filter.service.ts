import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

interface TodoSortFilters {
    title?: string;
    status?: string;
    createdAt?: string;
    dueDate?: string;
}

@Injectable()
export class SortFilterTodoService {
    constructor(private readonly prisma: PrismaService) {}

    private buildWhereClause(filters: TodoSortFilters) {
        const { title, status } = filters;
        const where: any = {};

        if (title) {
            where['title'] = {
                contains: title,
                mode: 'insensitive',
            };
        }

        if (status !== undefined) {
            where['completed'] = status === 'true';
        }

        return where;
    }

    private buildOrderByClause(filters: TodoSortFilters) {
        const { createdAt, dueDate } = filters;
        const orderBy: any = {};

        if (createdAt) {
            orderBy['createdAt'] = createdAt;
        }

        if (dueDate) {
            orderBy['dueDate'] = dueDate;
        }

        return orderBy;
    }

    async sortFilterTodos(filters: TodoSortFilters) {
        const where = this.buildWhereClause(filters);
        const orderBy = this.buildOrderByClause(filters);

        return this.prisma.todo.findMany({
            where,
            orderBy,
        });
    }

    async searchTitleTodos(title: string) {
        const where = this.buildWhereClause({ title });
        return this.prisma.todo.findMany({
            where,
        });
    }

    async filterStatusTodos(status: string) {
        const where = this.buildWhereClause({ status });
        return this.prisma.todo.findMany({
            where,
        });
    }

    async sortingTodos(createdAt: string, dueDate: string) {
        const orderBy = this.buildOrderByClause({ createdAt, dueDate });
        return this.prisma.todo.findMany({
            orderBy,
        });
    }
}
