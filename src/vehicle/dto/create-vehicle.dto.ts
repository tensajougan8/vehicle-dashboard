import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EngineDto } from './engine.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'The name of the vehicle.',
    minLength: 2,
    example: 'My Vehicle',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    description: 'The RTO number of the vehicle.',
    minLength: 5,
    example: 'AB12345',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  rtoNumber: string;

  @ApiProperty({
    description: 'The model number of the vehicle.',
    example: '123XZ',
  })
  modelNo: string;

  @ApiProperty({
    description: 'The color of the vehicle.',
    example: 'Red',
  })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({
    description: 'The brand of the vehicle.',
    example: 'Toyota',
  })
  @IsNotEmpty()
  @IsString()
  brand: string;

  @ApiProperty({
    description: 'The kms traveled of the vehicle.',
    example: 30,
  })
  @IsNumber()
  kms: number;

  @ApiProperty({
    type: EngineDto,
    description: 'The engine details of the vehicle.',
    example: {
      type: 'V8',
      displacement: '5.0L',
    },
  })
  @Type(() => EngineDto)
  @ValidateNested()
  readonly engine: EngineDto;

  @ApiProperty({
    description: 'The owner of the vehicle.',
    example: 'John Doe',
  })
  owner: string;
}
