import supertest from 'supertest';
import { App } from '../app';
import http_request from '../services/http_request/iqair_request';
import { testDataStore } from '../config/test-datasource';

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});


it("Test get air-quality endpoint", async () => {
    const testApp = new App(testDataStore, []);
    const request = supertest(testApp.app);

    const spy = jest.spyOn(http_request, `getByCoodinates`);
    const res = await request.get("/api/air_quality");

    expect(spy).toHaveBeenCalled();
    expect(res.status).toBe(200);

    testApp.close();
});
  
it("Get most polluted time of a city not recorded", async () => {
    const testApp = new App(testDataStore, []);
    const request = supertest(testApp.app);
    
    const res = await request.get("/api/most_poluted_time?city=Pa");
    expect(res.status).toBe(404);

    testApp.close();
});