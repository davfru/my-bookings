import { expect } from 'chai';
import { BookingRepository } from '../BookingRepository.js';
import { BookingConflictError } from '../../errors/BookingConflictError.js';
import { NotFoundError } from '../../errors/NotFoundError.js';

const mockDynamoDB = {
  put: () => ({ promise: () => Promise.resolve() }),
  get: () => ({ promise: () => Promise.resolve({ Item: {} }) }),
};

const tableName = 'testTable';

describe('BookingRepository', () => {

  describe('createBooking', () => {

    it('should create a booking', async () => {
      const bookingRepo = new BookingRepository(mockDynamoDB, tableName);
      const booking = {
        BookingId: 'testBookingId',
        // Add other required attributes here
      };

      const result = await bookingRepo.createBooking(booking);

      expect(result).to.deep.equal(booking);
    });

    it('should throw BookingConflictError when booking already exists', async () => {
      const mockDynamoDBWithConflict = {
        put: () => ({
          promise: () => Promise.reject({
            code: 'ConditionalCheckFailedException',
          }),
        }),
      };
      const bookingRepo = new BookingRepository(mockDynamoDBWithConflict, tableName);
      const booking = {
        BookingId: '123',
      };

      try {
        await bookingRepo.createBooking(booking);
      } catch (error) {
        expect(error instanceof BookingConflictError).to.be.true;
      }
    });
  });

  describe('getBooking', () => {

    it('should return a booking', async () => {
      const bookingRepo = new BookingRepository(mockDynamoDB, tableName);
      const bookingId = '12345';

      const result = await bookingRepo.getBooking(bookingId);

      expect(result).to.be.an('object');
      // TODO add more specific assertions for the returned booking
    });

    it('should throw NotFoundError when booking does not exist', async () => {
      const mockDynamoDBWithoutItem = {
        get: () => ({ promise: () => Promise.resolve({ Item: null }) }),
      };
      const bookingRepo = new BookingRepository(mockDynamoDBWithoutItem, tableName);
      const bookingId = '4355645';

      try {
        await bookingRepo.getBooking(bookingId);
      } catch (error) {
        expect(error instanceof NotFoundError).to.be.true;
      }
    });
  });
});
