import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { TicketModule } from './ticket/ticket.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [CartModule, TicketModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
