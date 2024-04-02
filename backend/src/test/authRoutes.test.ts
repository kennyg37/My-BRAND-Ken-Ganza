import request from 'supertest'; 
import express, { Express } from 'express';
import authRoutes from '../routes/authRoutes';


describe('Auth Routes', () => {
      let app: Express;
      before(() => {
        app = express();
        app.use('/v1/auth', authRoutes);
      });
      it('should get user data', async () => {
        const res = await request(app).get('/data');
      });
      it('should create a new user', async () => {
        const res = await request(app).post('/signup').send({
          account: 'admin',
          username: 'admin',
          email: 'email@example.com',
          password: 'password',
          confirmPassword: 'password',
        });
      });
});

