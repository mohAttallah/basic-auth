'use strict';

require('dotenv').config();
const { app } = require('../src/server');
const supertest = require('supertest');
const mockServer = supertest(app);



describe("Server test", () => {
  it('should return 404 for a bad route', async () => {
  const response = await mockServer.get('/bad-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not found');
  });
  it('should return 404 for a bad method', async () => {
  const response = await mockServer.put('/schools');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Not found');
});
  });
