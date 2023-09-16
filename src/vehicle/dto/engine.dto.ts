import { ApiProperty } from '@nestjs/swagger';

export class EngineDto {
  @ApiProperty({
    description: 'The type of the engine.',
    example: 'V8',
  })
  readonly type: string;

  @ApiProperty({
    description: 'The displacement of the engine.',
    example: '5.0L',
  })
  readonly displacement: string;

  @ApiProperty({
    description: 'The power output of the engine.',
    example: '450 hp',
  })
  readonly power: string;

  @ApiProperty({
    description: 'The torque of the engine.',
    example: '500 Nm',
  })
  readonly torque: string;
}
