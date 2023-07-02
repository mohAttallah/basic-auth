const { app } = require('../../server');
const supertest = require('supertest');
const request = supertest(app);
const bcrypt = require('bcrypt');
const { db, User } = require('../models/index');


describe('Authentication Routes', () => {
  beforeAll(async () => {
    await db.sync();
  });

  beforeEach(async () => {
    
    await User.destroy({ truncate: true });
  });

  afterAll(async () => {
   
    await db.close();
  });

  describe('POST /signup', () => {
    test('should create a new user', async () => {
      const response = await request
        .post('/signup')
        .send({ username: 'testuser', password: 'testpassword' });

      expect(response.status).toBe(201);
      // Add more assertions if needed
    });
  });

  describe('POST /signin', () => {
    beforeEach(async () => {
      
      const hashedPassword = await bcrypt.hash('testpassword', 10);
      await User.create({ username: 'testuser', password: hashedPassword });
    });

    test('should authenticate a user with valid credentials', async () => {
      const response = await request
        .post('/signin')
        .auth('testuser', 'testpassword');

      expect(response.status).toBe(200);
     
    });

    test('should return 401 for invalid credentials', async () => {
      const response = await request
        .post('/signin')
        .auth('testuser', 'wrongpassword');

      expect(response.status).toBe(401);
      
    });
  });
});
