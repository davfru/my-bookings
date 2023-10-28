import serverless from 'serverless-http';
import express from 'express';
import * as yup from 'yup';
import { creatBookingValidationSchema } from './validationSchema.js';

const BASE_PATH = "/bookings";
const app = express();

const validateBody = (schema) => async (req, res, next) => {

  try {
    await schema.validate(JSON.parse(req.body));
    next();
  } catch(e) {
    // add more info to 400 body (key errors, etc...)
    return res.status(400).json();
  }
}

app.post(`${BASE_PATH}`, 
  validateBody(creatBookingValidationSchema), 
  async (req, res) => {
    res.status(200).json({ "foo": "createBookingHandler" });
});

let getBookingHandler = async (req, res) => {
  res.status(200).json({ "foo": "getBookingHandler" });
};

app.get(`${BASE_PATH}/:id`, getBookingHandler);

export const handler = serverless(app);
