import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { CreateTodoDto, UpdateTodoDto } from "./dto";

@Controller("todo")
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createTodo(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.createTodo(createTodoDto);
    }

    @Get("/all")
    getAllTodo() {
        return this.todoService.getAllTodo();
    }

    @Get("/:id")
    getTodo(@Param("id") id: string) {
        const todoId = parseInt(id);
        return this.todoService.getTodo(todoId);
    }

    @Put("/status/:id")
    changeStatus(@Param("id") id: string) {
        const todoId = parseInt(id);
        return this.todoService.changeStatus(todoId);
    }

    @Put(":id")
    updateTodo(@Param("id") id: string, @Body() updateTodoDto: UpdateTodoDto) {
        const todoId = parseInt(id);
        return this.todoService.updateTodo(todoId, updateTodoDto);
    }

    @Delete(":id")
    deleteTodo(@Param("id") id: string) {
        const todoId = parseInt(id);
        return this.todoService.deleteTodo(todoId);
    }
}
