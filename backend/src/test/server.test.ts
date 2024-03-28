import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/authRoutes';
import blogRoutes from '../routes/blogRoutes';
import contactRoutes from '../routes/contactRoutes';

describe('Server', () => {
  let app: express.Express;

  before(() => {
    mongoose.connect('mongodb://localhost:27017/test');

    app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/v1/auth', authRoutes);
    app.use('/v1/blog', blogRoutes);
    app.use('/v1/feedback', contactRoutes);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  describe('GET /v1/auth/data', () => {
    it('should return user data', async () => {
      const res = await request(app).get('/v1/auth/data');
      expect(res.status).to.equal(200);
    });
  });

  
});
