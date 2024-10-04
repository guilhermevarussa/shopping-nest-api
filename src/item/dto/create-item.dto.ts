import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'

export class CreateItemDto {
  @ApiProperty({ example: 'Boné' })  
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ example: 'Boné aba reta', description: 'Optional description of the item' })
  @IsOptional()
  @IsString()
  description: string

  @ApiProperty({ example: 5, description: 'Needed quantity' })
  @IsInt()
  @Min(0)
  quantity: number
}
