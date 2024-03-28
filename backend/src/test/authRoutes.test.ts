import { expect } from 'chai';
import 'mocha';
import request from 'supertest'; 
import express, { Express } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/auth';

describe('authRoutes', () => {
  let app: Express;

  before(() => {
    app = express();
    app.use('/', require('../routes/auth').default);
  });

  it('should get user data', async () => {
    const res = await request(app).get('/data');
    expect(res.status).to.equal(200);
  });

  it('should create a new user', async () => {
  const password = 'password';
    const hashedPassword = await bcrypt.hash(password, 10)
    const res = await request(app)
      .post('/signup')
      .send({
        account: 'admin',
        username: 'test',
        email: 'test@example.com',
        password: hashedPassword,
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'User created successfully');
   });

    it('should login a user', async () => {
        const password = 'password';
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
        account: 'admin',
        username: 'test',
        password: hashedPassword,
        });
       
    });
});
