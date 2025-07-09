import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateDto } from './dto/create.dto';
import UpdateDto from './dto/update.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() body: CreateDto) {
    return this.todosService.create(body);
  }

  @Get()
  getAll() {
    return this.todosService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.todosService.getOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateDto) {
    return this.todosService.update(+id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.todosService.delete(+id);
  }
}
