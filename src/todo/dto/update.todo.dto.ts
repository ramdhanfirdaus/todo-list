import { IsNotEmpty, IsBoolean, IsDate } from "class-validator";

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