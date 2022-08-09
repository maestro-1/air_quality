import { Country } from '../entity/country';


export interface LocationOptions {
    id?: number;
    city?: string;
    // location?: Tuple;
}

export interface LocationDetails {
    city: string;
    state: string;
    country: Country;
    // location?: Tuple;
}

export interface IPollution {
    aqius: number;
    aqicn: number;
    mainus: string;
    maincn: string;
    ts: string
}

export interface PollutionEntry {
    city: string,
    state: string,
    country: string,
    // location: { type: 'Point', coordinates: [ 2.351666, 48.859425 ] },
    pollution: IPollution
}