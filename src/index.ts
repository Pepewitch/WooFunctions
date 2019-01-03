import * as functions from 'firebase-functions';
import express from 'express';
import WooCommerceAPI from 'woocommerce-api';
import { config } from 'dotenv';
import * as admin from 'firebase-admin';
config();
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});
const app = express();
const WooCommerce = new WooCommerceAPI({
  url: 'https://monkeymonkeyshop.com',
  consumerKey: process.env.CONSUMER_KEY,
  consumerSecret: process.env.CONSUMER_SECRET,
  version: 'wc/v3',
  wpAPI: true,
});

app.get('/woo/*', async (req, res) => {
  const result = await WooCommerce.getAsync(req.url.slice(5));
  return res.status(200).send(JSON.parse(result.toJSON().body));
});

export const hello = functions.https.onRequest(app);
