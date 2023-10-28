export class BookingService {

  constructor(bookingRepository) {
    this.repository = bookingRepository;
  }

  async createBooking(booking) {

    const itemToPersist = {
        BookingId: this._getBookingId(booking.roomId, booking.checkInDate, booking.checkOutDate),
        RoomId: booking.roomId,
        CheckInDate: booking.checkInDate,
        CheckOutDate: booking.checkOutDate
    }

    console.debug("createBooking - itemToPersist: %s", itemToPersist);

    return this.repository.createBooking(itemToPersist);
  }

  async getBooking(id) {
    return this.repository.getBooking(id);
  }

  /**
   * generate a unique id with the given parameters
   * @param {*} roomId 
   * @param {*} checkInDate 
   * @param {*} checkOutDate 
   * @returns 
   */
  _getBookingId(roomId, checkInDate, checkOutDate) {
    return Buffer.from(`${roomId}#${checkInDate}#${checkOutDate}`).toString('base64url');
  }
}