import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { createTodoDTO } from './dto/createTodo.dto';
import { updateTodoDTO } from './dto/updateTodo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todo')
@UseGuards(AuthGuard('jwt')) // 🔒 Protect all routes under /todo
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAllTodos(@Req() req) {
    return this.todoService.getAllTodosForUser(req.user.userId);
  }

  @Get(':id')
  async getTodoById(@Param('id') id: number, @Req() req) {
    try {
      return await this.todoService.getTodoByIdForUser(+id, req.user.userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post()
  createTodo(@Body() data: createTodoDTO, @Req() req) {
    return this.todoService.createTodoForUser(data, req.user.userId);
  }

  @Put('update/:id')
  async updateTodo(
    @Param('id') id: number,
    @Body() data: updateTodoDTO,
    @Req() req,
  ) {
    try {
      return await this.todoService.updateTodoForUser(+id, data, req.user.userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: number, @Req() req) {
    try {
      return await this.todoService.deleteTodoForUser(+id, req.user.userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':id/toggle')
  async toggleTodoStatus(@Param('id') id: number, @Req() req) {
    try {
      return await this.todoService.toggleTodoStatusForUser(+id, req.user.userId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}