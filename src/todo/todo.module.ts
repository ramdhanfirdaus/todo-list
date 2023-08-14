import { Module } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { PrismaService } from "../prisma.service";
import { SortFilterTodoService } from "./sort.filter.service";
import { SortFilterTodoController } from "./sort.filter.controller";

@Module({
  providers: [TodoService, PrismaService, SortFilterTodoService],
  controllers: [TodoController, SortFilterTodoController]
})
export class TodoModule {}
