const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#GET /authors should return list of authors', async () => {
    const resp = await request(app).get('/authors');
    expect(resp.body.length).toEqual(8);
    expect(resp.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String)
    });
  });

  it('#GET /authors/:id should return author details and book details', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.body).toEqual({
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
      books: expect.any(Array),
    });
  });
  it('#POST /authors should add new authors', async () => {
    const resp = await request(app).post('/authors').send(
      { name: 'Douglas Preston', dob: '5-20-1956', pob: 'Cambridge, Massachusetts, United States' }
    );
    expect(resp.status).toBe(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      name:expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});


