import supertest from 'supertest';
import App from '../app';
import http_request from '../services/http_request/iqair_request';
import { testDataStore } from '../config/test-datasource';

const testApp = new App(testDataStore, []);
const request = supertest(testApp.app);

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

afterAll(() => {
    testApp.close();
})


it("Test get air-quality endpoint", async () => {
    const spy = jest.spyOn(http_request, `getByCoodinates`);
    const res = await request.get("/api/air_quality");

    expect(spy).toHaveBeenCalled();
    expect(res.status).toBe(200);
});