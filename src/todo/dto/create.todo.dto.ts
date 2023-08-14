import { IsNotEmpty, IsBoolean, IsDate } from "class-validator";

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