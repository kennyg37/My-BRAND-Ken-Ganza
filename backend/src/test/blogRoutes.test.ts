import request from 'supertest'; 
import express, { Express } from 'express';
import blogRoutes from '../routes/blogRoutes';

describe('Blog Routes', () => {
      let app: Express;
      before(() => {
        app = express();
        app.use('/v1/blog', blogRoutes);
      });
      it('should get blog data', async () => {
        const res = await request(app).get('/data');
      });
      it('should create a new blog', async () => {
        const res = await request(app).post('/blog').send({
          title: 'title',
          subtitle: 'subtitle',
          content: 'content',
        });
    });
});
