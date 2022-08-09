import supertest from 'supertest';
import App from '../app';

const request = supertest(App);

it("Gets the test endpoint", async () => {
    const res = await request.get("/api/air_quality");
    expect(res.status).toBe(200);
});
  
it("Gets the test endpoint", async () => {
    const res = await request.get("/api/most_poluted_time?city=paris");
    expect(res.status).toBe(200);
});