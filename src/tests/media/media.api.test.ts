import request from "supertest";

describe("Media API-s", () => {
  describe("#getMediaFile", () => {
    it("Should get media file with specified id", async(done) => {
      const fileId = 1;
      // TODO Replace "hui" with an express app
      const res = await request("hui").get(`/api/media/${fileId}`);
      expect(res.statusCode).toBe(200);
      done();
    });
  });

  describe("#getMediaFilesList", () => {
    it("Should get media files list", async(done) => {
      const res = await request("hui").get("/api/media");
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
});
