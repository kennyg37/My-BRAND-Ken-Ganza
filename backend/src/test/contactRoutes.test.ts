import request from 'supertest'; 
import express, { Express } from 'express';
import contactRoutes from '../routes/contactRoutes';

describe('Contact Routes', () => {
      let app: Express;
      before(() => {
        app = express();
        app.use('/v1/feedback', contactRoutes);
      });
      it('should get feedback', async () => {
        const res = await request(app).get('/data');
      });
      it('should create a new feedback', async () => {
        const res = await request(app).post('/feedback').send({
          name: 'admin',
          email: 'admin@example.com',
          message: 'message',
        });
    });
 });