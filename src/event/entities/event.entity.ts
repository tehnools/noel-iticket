import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export type EventType = 'allocated' | 'generalAdmission';

export class Event {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsUrl()
  type: EventType;

  @IsNumber()
  bookingLimit: number;

  @IsOptional()
  @IsNumber({}, { each: true })
  allocaltedSeats?: Array<number>;
}
