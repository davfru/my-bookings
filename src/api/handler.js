import serverless from 'serverless-http';
import express from 'express';

const app = new express();
const basePath = "my-bookings";

// rooms api

let createRoomHandler = async (req, res) => {
    res.status(200).json({ "foo": "bar1" });
};

let getRoomHandler = async (req, res) => {
  res.status(200).json({ "foo": "bar2" });
};

app.post(`/${basePath}/rooms`, createRoomHandler);
app.get(`/${basePath}/rooms/:id`, getRoomHandler);


// bookings apis

let createBookingHandler = async (req, res) => {
  res.status(200).json({ "foo": "bar3" });
};

let getBookingHandler = async (req, res) => {
res.status(200).json({ "foo": "bar4" });
};

app.post(`/${basePath}/bookings`, createBookingHandler);
app.get(`/${basePath}/bookings/:id`, getBookingHandler);

// app.use(errorHandler);

export const handler = serverless(app);
