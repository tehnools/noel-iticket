export type EventType = 'allocated' | 'generalAdmission';

export class EventEntity {
  id: number;
  name: string;
  imageUrl: string;
  type: EventType;
  bookingLimit: number;
  allocaltedSeats?: Array<number>;
}
