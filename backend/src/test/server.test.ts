import { expect } from 'chai';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../server'; 

describe('App', () => {
  before(() => {

    mongoose.connect('mongodb://localhost:27017/portfolio');
    mongoose.connection.once('open', () => {
      console.log('Connected to MongoDB');
    });
  });

  after(() => {
    mongoose.disconnect();
  });

  it('should return a 200 status code for GET /v1/auth', async () => {
    const res = await request(app).get('/v1/auth');
  });
    it('should return a 200 status code for GET /v1/blog', async () => {
        const res = await request(app).get('/v1/blog');
    });
    it('should return a 200 status code for GET /v1/feedback', async () => {
        const res = await request(app).get('/v1/feedback');
    });
});
