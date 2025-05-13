import { IsNotEmpty, IsInt, IsEmail } from "class-validator";

export class createTodoDTO{
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description:string;

}