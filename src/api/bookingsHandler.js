import serverless from 'serverless-http';
import express from 'express';
import AWS from 'aws-sdk';
import { creatBookingValidationSchema } from './validationSchema.js';
import { BookingService } from '../lib/service/BookingService.js';
import { BookingRepository } from '../lib/repository/BookingRepository.js';
import { BookingConflictError } from '../lib/errors/BookingConflictError.js';
import { NotFoundError } from '../lib/errors/NotFoundError.js';
import { BaseError } from '../lib/errors/BaseError.js';

const BASE_PATH = "/bookings";
const TABLE_NAME = process.env.BOOKINGS_TABLE_NAME;
const app = express();
const service = new BookingService(new BookingRepository(new AWS.DynamoDB.DocumentClient(), TABLE_NAME));

// middlewares

const validateBody = (schema) => async (req, res, next) => {

  try {
    await schema.validate(JSON.parse(req.body));
    next();
  } catch(e) {
    // add more info to 400 body (key errors, etc...)
    return res.status(400).json();
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({});
  }
  res.status(500).json({});
};

// handlers

app.post(`${BASE_PATH}`, 
  validateBody(creatBookingValidationSchema), 
  async (req, res, next) => {

    // use body-parser library to parse body
    const body = JSON.parse(req.body);

    // can use a middleware shared between handlers to log request and responses
    console.log("Invoking POST /bookings - req: %s", body);

    try {
      await service.createBooking(body);
      res.status(201).json({});
    } catch(e) {
      next(e);
    }
});


app.get(`${BASE_PATH}/:id`, async (req, res, next) => {

  const id = req.params.id;

  console.log("Invoking GET /bookings/:id - id: %s", id);

  try {
    const booking = await service.getBooking(id);
    res.status(200).json(booking);
  } catch(e) {
    next(e);
  }
  
});

app.use(errorHandlerMiddleware);

export const handler = serverless(app);
