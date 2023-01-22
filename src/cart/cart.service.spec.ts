import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be able to create a cart', () => {
      //TODO
    });

    it('should not be able to create cart if seats not selected', () => {
      //TODO
    });
    it('should not be able to create cart if seats already associated with event', () => {
      //TODO
    });
    it('should not be able to create cart if tickets are not found', () => {
      //TODO
    });

    it('should not be able to create cart if number of seats selected is over the event booking limit', () => {
      //TODO
    });
  });

  describe('update', () => {
    it('should be able to update cart to add ', () => {
      //TODO
    });

    it('should not be able to update cart if seats not selected', () => {
      //TODO
    });

    it('should not be able to update cart if seats already associated with event', () => {
      //TODO
    });

    it('should not be able to update cart if tickets are not found', () => {
      //TODO
    });

    it('should not be able to update cart if number of seats selected is over the event booking limit', () => {
      //TODO
    });
  });

  describe('delete', () => {
    it('should be able to empty cart', () => {
      //TODO
    });
  });
});
