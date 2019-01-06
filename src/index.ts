import * as functions from 'firebase-functions';
import express from 'express';
import WooCommerceAPI from 'woocommerce-api';
import { config } from 'dotenv';
import * as admin from 'firebase-admin';
import cors from 'cors';
config();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const app = express();

app.use(cors());

const WooCommerce = new WooCommerceAPI({
  url: 'https://monkeymonkeyshop.com',
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  version: 'wc/v3',
  wpAPI: true,
});

app.get('/ping', (req, res) => {
  res.status(200).send({ message: 'pong' });
});

app.get('/woo/*', async (req, res) => {
  const result = await WooCommerce.getAsync(req.url.slice(5));
  return res.status(200).send(JSON.parse(result.toJSON().body));
});

app.post('/woo/*', async (req, res) => {
  const result = await WooCommerce.postAsync(req.url.slice(5), req.body);
  return res.status(200).send(JSON.parse(result.toJSON().body));
});

app.put('/woo/*', async (req, res) => {
  const result = await WooCommerce.putAsync(req.url.slice(5), req.body);
  return res.status(200).send(JSON.parse(result.toJSON().body));
});

export const shop = functions.https.onRequest(app);
