import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';
import { EventEntity, EventType } from '../entities/event.entity';

export class Event implements EventEntity {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  type: EventType;

  @IsNumber()
  bookingLimit: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  allocaltedSeats?: Array<number>;
}
