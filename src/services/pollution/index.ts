import { Location } from '../../entity/location';
import { Country } from '../../entity/country';
import { Pollution } from '../../entity/pollution';
import { Repository } from 'typeorm';
import { 
    LocationDetails, 
    LocationOptions, 
    PollutionEntry, 
    IPollution 
} from '../../interfaces';
import dataSource from '../../config/data-source';

export class CountryService {
    private countryRepository: Repository<Country>;
    
    constructor(countryRepo: Repository<Country>) {
        this.countryRepository = countryRepo;
    }

    async addCountry(name: string): Promise<Country> {
        let country = await this.getCountry(name);

        if (!country) {
            country = new Country();
            country.name = name;
            await this.countryRepository.save(country);
        }

        return country;
    }

    async getCountry(name: string): Promise<Country> {
        return await this.countryRepository.findOneBy({ name })
    }
}


export class LocationService {
    private locationRepository: Repository<Location>;

    constructor(locationRepo: Repository<Location>) {
        this.locationRepository = locationRepo;
    }

    async addLocation(locationDetails: LocationDetails): Promise<Location> {
        const city = locationDetails.city
        let location = await this.getUniqueLocation({ city });

        if(!location){
            location = this._createLocationObj(locationDetails)
            location.country = locationDetails.country;
            await this.locationRepository.save(location);
        }
        return location
    }

    private _createLocationObj(locationDetails: LocationDetails): Location {
        const location = new Location();
        location.state = locationDetails.state;
        location.city = locationDetails.city;
        return location;
    }

    async getUniqueLocation(uniqueOptions: LocationOptions): Promise<Location> {
        return await this.locationRepository.findOneBy(uniqueOptions);
    }
}


export class PollutionService {
    private locationService: LocationService;
    private countryService: CountryService;
    private pollutionRepository: Repository<Pollution>;
    

    constructor(
        locationService: LocationService, 
        countryService: CountryService,
        pollutionRepo: Repository<Pollution>
    ) {
        this.locationService = locationService;
        this.countryService = countryService;
        this.pollutionRepository = pollutionRepo;
    }


    async addPollution(data: PollutionEntry): Promise<Pollution> {
        let location = await this.locationService.getUniqueLocation({ city: data.city });
        let country = await this.countryService.getCountry(data.country)

        if(!country){
            country = await this.countryService.addCountry(data.country)
        };

        if(!location){
            const locationDetails = {
                city: data.city,
                state: data.state,
                country: country
            }
            location = await this.locationService.addLocation(locationDetails);
        }

        const pollution = this._createPollutionObj(data.pollution);
        pollution.location = location
        await this.pollutionRepository.save(pollution);

        return pollution;
    }

    private _createPollutionObj(pollutionDetails: IPollution): Pollution {
        const pollution = new Pollution();
        pollution.aqius = pollutionDetails.aqius;
        pollution.aqicn = pollutionDetails.aqicn;
        pollution.mainus = pollutionDetails.mainus;
        pollution.maincn = pollutionDetails.maincn;
        pollution.recordedPollutionTime = pollutionDetails.ts
        return pollution;
    }

    async getPollutionBy(name: string){
        return await this.pollutionRepository.createQueryBuilder("pollution")
        .innerJoinAndSelect("pollution.location", "location")
        .where("location.city = :name", { name })
        .orderBy("aqius", "DESC")
        .addOrderBy("aqicn", "DESC")
        .getOne()
    }
}

export const countrySVC = new CountryService(
    dataSource.getRepository(Country)
)

export const locationSVC = new LocationService(
    dataSource.getRepository(Location)
)

export const pollutionSVC = new PollutionService(
    locationSVC, 
    countrySVC, 
    dataSource.getRepository(Pollution)
)
