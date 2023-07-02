'use strict';

require('dotenv').config();
const { app } = require("../server");
const supertest = require("supertest");
const req = supertest(app);


describe("Server test", () => {
  it("Route not found", async () => {
    const res = await req.get("/new");
    expect(res.status).toEqual(404);
  });

  it("Route not found", async () => {
    const res = await req.put("/new");
    expect(res.status).toEqual(404);
  });
});

