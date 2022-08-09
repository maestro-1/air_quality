import axios from 'axios';
import requestHandler  from '../iqair_request';


jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('should fetch pollution', async () => {
    const pollution = {
        "ts": "2022-08-06T16:00:00.000Z",
        "aqius": 35,
        "mainus": "o3",
        "aqicn": 27,
        "maincn": "o3"
    }
    const resp = { data: pollution };
    mockedAxios.get.mockResolvedValue(resp);

    const result = await requestHandler.getByCoodinates(mockedAxios, "32", "2");
    return expect(result).toBe(resp.data);
});