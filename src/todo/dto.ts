import { IsNotEmpty, IsOptional, IsBoolean, IsDate } from 'class-validator';

export class CreateTodoDto {
    @IsNotEmpty()
    title: string;

    @IsBoolean()
    @IsNotEmpty()
    completed?: boolean;

    @IsDate()
    @IsNotEmpty()
    dueDate?: Date;
}

export class UpdateTodoDto {
    @IsNotEmpty()
    title?: string;

    @IsBoolean()
    @IsNotEmpty()
    completed?: boolean;

    @IsDate()
    @IsNotEmpty()
    dueDate?: Date;
}