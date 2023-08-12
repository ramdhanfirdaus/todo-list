import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from './dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createTodo(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.createTodo(createTodoDto);
    }

    @Get('/sort-filter')
    @ApiQuery({name:"title", required:false})
    @ApiQuery({name:"createdAt", enum: [ "asc", "desc"], required:false})
    @ApiQuery({name:"status", enum: [ "true", "false"], required:false})
    @ApiQuery({name:"dueDate", enum: [ "asc", "desc"], required:false})
    sortFilterTodos(
        @Query('title') title: string,
        @Query('createdAt') createdAt: string,
        @Query('status') status: string,
        @Query('dueDate') dueDate: string,
    ) {
        return this.todoService.sortFilterTodos(title, createdAt, status, dueDate);
    }

    @Get('/:id')
    getTodo(@Param('id') id: string) {
        const todoId = parseInt(id);
        return this.todoService.getTodo(todoId);
    }

    @Put('/status/:id')
    changeStatus(@Param('id') id: string) {
        const todoId = parseInt(id);
        return this.todoService.changeStatus(todoId);
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        const todoId = parseInt(id);
        return this.todoService.updateTodo(todoId, updateTodoDto);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        console.log(id)
        const todoId = parseInt(id);
        return this.todoService.deleteTodo(todoId);
    }
}
