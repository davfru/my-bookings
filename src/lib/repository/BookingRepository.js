import { BookingConflictError } from "../errors/BookingConflictError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

// using typescript we can have an interface as multiple implementations (dynamo db, aurora, etc...)

/**
 * data model perstisted on dynamo has these attributes:
 * - BookingID (PK) a concatenated base64 string of roomId, checkInDate and checkOutDate attributes. This ensure a unique key.
 * 
 * limitations:
 * - booking overlapping conditional write works only if the new record has the exact same roomid, checkInDate and checkOutDate
 * of the existing one on dynamodb
 */
export class BookingRepository {

  constructor(dynamoDb, tableName) {
    this.dynamoDB = dynamoDb;
    this.tableName = tableName;
  }

  /**
   * 
   * @param {*} booking item to persist on dynamo db
   * @returns persisted item
   * @throws BookingConflictError when booking not available
   */
  async createBooking(booking) {

    const params = {
      TableName: this.tableName,
      Item: booking,
      ConditionExpression: 'attribute_not_exists(BookingId)',
    };

    try {
      await this.dynamoDB.put(params).promise();
      return booking;
    } catch (error) {

      if(error.code === "ConditionalCheckFailedException") {
        throw new BookingConflictError();
      }

      // generic error otherwise
      throw new Error(error);
    }
  }

  /**
   * 
   * @param {*} id 
   * @param {*} date 
   * @returns 
   */
  async getBooking(id) {

    const params = {
      TableName: this.tableName,
      Key: { BookingId: id }
    };

    const result = await this.dynamoDB.get(params).promise();
      
    const item = result.Item;

    console.log("getBooking - item found: %", item);

    if(!item) {
      throw new NotFoundError();
    }

    return item;
  }
}
