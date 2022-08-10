import supertest from 'supertest';
import App from '../app';
import http_request from '../services/http_request/iqair_request';

const request = supertest(App);

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});


it("Test get air-quality endpoint", async () => {
    const spy = jest.spyOn(http_request, `getByCoodinates`);
    const res = await request.get("/api/air_quality");

    expect(spy).toHaveBeenCalled();
    expect(res.status).toBe(200);
});
  
it("Get most polluted time of a city not recorded", async () => {
    const res = await request.get("/api/most_poluted_time?city=Lagos");
    expect(res.status).toBe(404);
});