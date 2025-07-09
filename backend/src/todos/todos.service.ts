import { Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import UpdateDto from './dto/update.dto';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateDto) {
    return this.prisma.todo.create({ data: body });
  }

  getAll() {
    return this.prisma.todo.findMany();
  }

  getOne(id: number) {
    return this.prisma.todo.findUnique({ where: { id } });
  }

  update(id: number, body: UpdateDto) {
    return this.prisma.todo.update({
      where: { id },
      data: body,
    });
  }

  delete(id: number) {
    return this.prisma.todo.delete({ where: { id } });
  }
}
