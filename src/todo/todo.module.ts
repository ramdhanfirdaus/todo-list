import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { PrismaService } from "../prisma.service";
import { SortFilterTodoService } from "./sort.filter.service.spec";

@Module({
  providers: [TodoService, PrismaService, SortFilterTodoService],
  controllers: [TodoController]
})
export class TodoModule {}
