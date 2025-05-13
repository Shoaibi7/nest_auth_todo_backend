import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { createTodoDTO } from './dto/createTodo.dto';
import { updateTodoDTO } from './dto/updateTodo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getAllTodosForUser(userId: number) {
    const todos = await this.todoRepository.find({
      where: { user: { id: userId } },
    });
    return {
      message: 'Todos fetched successfully',
      data: todos,
      totalLength: todos.length,
    };
  }

  async getTodoByIdForUser(todoId: number, userId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo not found or does not belong to you`);
    }

    return {
      message: 'Todo fetched successfully',
      data: todo,
    };
  }

  async createTodoForUser(data: createTodoDTO, userId: number) {
    const newTodo = this.todoRepository.create({
      ...data,
      user: { id: userId },
    });

    const savedTodo = await this.todoRepository.save(newTodo);

    return {
      message: 'Todo created successfully',
      data: savedTodo,
    };
  }

  async updateTodoForUser(todoId: number, data: updateTodoDTO, userId: number) {
    const todo = await this.todoRepository.preload({
      id: todoId,
      ...data,
      user: { id: userId },
    });

    if (!todo) {
      throw new NotFoundException(`Todo not found or does not belong to you`);
    }

    await this.todoRepository.save(todo);

    return {
      message: 'Todo updated successfully',
      data: todo,
    };
  }

  async deleteTodoForUser(todoId: number, userId: number) {
    const result = await this.todoRepository.delete({
      id: todoId,
      user: { id: userId },
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Todo not found or does not belong to you`);
    }

    return {
      message: 'Todo deleted successfully',
    };
  }

  async toggleTodoStatusForUser(todoId: number, userId: number) {
    const todo = await this.todoRepository.findOne({
      where: { id: todoId, user: { id: userId } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo not found or does not belong to you`);
    }

    todo.isComplete = !todo.isComplete;
    await this.todoRepository.save(todo);

    return {
      message: 'Todo status toggled successfully',
      data: todo,
    };
  }
}