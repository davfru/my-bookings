import serverless from 'serverless-http';
import express from 'express';

const app = new express();
const basePath = "/bookings";

let createBookingHandler = async (req, res) => {
  res.status(200).json({ "foo": "createBookingHandler" });
};

let getBookingHandler = async (req, res) => {
  res.status(200).json({ "foo": "getBookingHandler" });
};

app.post(`${basePath}`, createBookingHandler);
app.get(`${basePath}/:id`, getBookingHandler);

export const handler = serverless(app);
