import { PartialType } from '@nestjs/mapped-types';
import { CreateDto } from './create.dto';

export default class UpdateDto extends PartialType(CreateDto) {}
