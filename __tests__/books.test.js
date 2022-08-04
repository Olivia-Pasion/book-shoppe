const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /books should return a list of books', async () => {
    const resp = await request(app).get('/books');
    expect(resp.body.length).toEqual(4);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number)
    });
  });
  it('#GET /books/:id should return title, released, and authors []', async () => {
    const resp = await request(app).get('/books/1');
    expect(resp.body).toEqual({
      title: expect.any(String),
      released: expect.any(Number),
      authors: expect.any(Array)
    });
  });
  it('#POST /books should add a new book', async () => {
    const resp = await request(app).post('/books').send({ title: 'Relic', released:  1995 });
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      released: expect.any(Number),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
