import { setupTestDB, teardownTestDB } from '../../../../jest-singleton';
import { CountryService, LocationService, PollutionService } from '../../pollution';
import { testDataStore } from '../../../config/test-datasource';
import { Location } from '../../../entity/location';
import { Country } from '../../../entity/country';
import { Pollution } from '../../../entity/pollution';

beforeAll(async () => {
    await setupTestDB();
});

afterAll(() => {
    teardownTestDB();
});

describe("Test various services", () => {
    const testCountrySVC = new CountryService(
        testDataStore.getRepository(Country)
    )
    
    const testLocationSVC = new LocationService(
        testDataStore.getRepository(Location)
    )
    
    const pollutionSVC = new PollutionService(
        testLocationSVC, 
        testCountrySVC, 
        testDataStore.getRepository(Pollution)
    )

    test('test add new country', async () => {
        const country = await testCountrySVC.addCountry("Algeria")
        expect(country.name).toBe("Algeria")
    });

    test('test get country', async () => {
        const country = await testCountrySVC.getCountry("Algeria")
        expect(country.name).toContain("Algeria")
    });

    test('add new location', async () => {
        const country = await testCountrySVC.addCountry("France");
        const entry = { 
            city: "paris",
            state: "ile-de-france",
            country
        }
        const location = await testLocationSVC.addLocation(entry);
        expect(location.city).toBe('paris');
    });

    test('get location', async () => {
        const location = await testLocationSVC.getUniqueLocation({ 
            city: 'paris' 
        })

        expect(location.state).toBe('ile-de-france')
    })
    
    test('pollution service', async () => {
        const entry = { 
            city: "paris",
            state: "ile-de-france",
            country: "france",
            pollution: {
                "ts": "2022-08-06T16:00:00.000Z",
                "aqius": 35,
                "mainus": "o3",
                "aqicn": 27,
                "maincn": "o3"
            }
        }
        const pollution = await pollutionSVC.addPollution(entry);
        expect(pollution.aqicn).toBe(27);
        expect(pollution.maincn).toBe("o3");
    });
});