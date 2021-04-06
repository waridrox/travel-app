const request = require("supertest");
const app = require("../src/server/app-server");

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("Test the trips path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/trips")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});
