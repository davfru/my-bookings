
import chai from 'chai';
import chaiHttp from 'chai-http';
import { handler } from '../bookingsHandler.js';

const expect = chai.expect;

chai.use(chaiHttp);

describe('POST /bookings', () => {
    
  it('should return 400 for invalid input', async () => {
  
    const response = await handler({
        resource: "/bookings",
        path: "/bookings",
        httpMethod: "POST",
        body: {
          roomId: "1234",
          checkInDate: '2023-13-352', // error
          checkOutDate: "2023-10-10"
        }
      });

    expect(response.statusCode).to.be.equal(400);
    // add more expect on body error messages ..
  });

  it('should return 200 for valid input', async () => {
    const response = await handler({
        resource: "/bookings",
        path: "/bookings",
        httpMethod: "POST",
        body: {
          roomId: "1234",
          checkInDate: '2023-12-12', 
          checkOutDate: "2023-10-10"
        }
      });

    expect(response.statusCode).to.be.equal(200);
  });
});
