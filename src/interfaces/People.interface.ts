import Species from './Species.interface';
import Film from './Film.interface';

/**
 * Interface for People result in swapi.dev
 */
export default interface People {
    name: string;
    height: string|number;
    mass: string|number;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: Array<string>;
    species: Array<string>;
    vehicles: Array<string>;
    starships: Array<string>;
    created: string;
    edited: string;
    url: string;

    // added fields for details
    species_details: Species;
    film_details: Array<Film>;
    film_name_list: string;
}