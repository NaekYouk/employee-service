import request from "supertest";

describe("Users API", () => {
  describe("#createUser", () => {
    it("Should create new user", async(done) => {
      const res = await request("hui")
        .post("/api/users/create")
        .send({
          username: `user_${Math.random()}`,
          email: `email${Math.random()}@mail.com`,
          password: "123"
        });
      expect(res.statusCode).toEqual(201);
      done();
    });
  });

  describe("#authorize", () => {
    it("Should authorize user", async(done) => {
      const expectedObject = {
        user_id: "1",
        user_email: "test@mail.com",
        user_name: "test"
      };

      const res = await request("hui").get("/api/users/authorize");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedObject);
      done();
    });
  });
});
