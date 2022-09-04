import JSONModel from "sap/ui/model/json/JSONModel";
import PeopleRepository from '../repository/People.repository';
import People from '../interfaces/People.interface';
import Species from '../interfaces/Species.interface';
import Film from '../interfaces/Film.interface';
import ObjectListParams from "../interfaces/ObjectListParams.interface";

/**
 * People service class
 */
export default class PeopleService
{
    peopleRepository: PeopleRepository;

    /**
     * Constructor
     */
    constructor() {
        this.peopleRepository = new PeopleRepository();
    }

    /**
     * Gets people list based on parameters
     * @param   {object} params 
     * @returns {Promise<JSONModel>}
     */
    public async getPeopleList(params : Object = {}) : Promise<JSONModel> {
        return await this.peopleRepository.getPeople(params);
    }

    /**
     * Find people details from the people list
     * @param   {People[]} peopleList 
     * @param   {string}   name 
     * @returns {People}
     */
    public findDetailsFromList(objectList : ObjectListParams, name : string) : People {
        let selectedPeople : People;
		objectList['peopleList'].forEach((people : People) => {
			if (people.name === name) {
				selectedPeople = {...people};
			}
		});

        selectedPeople['film_details'] = selectedPeople['films'].map((filmUrl : string) => {
            return this.findFilmDetailFromList(objectList['filmList'], filmUrl);
        });

        let selectedPeopleSpeciesList = selectedPeople['species'].map((speciesUrl : string) => {
            return this.findSpeciesDetailFromList(objectList['speciesList'], speciesUrl);
        });

        if (selectedPeopleSpeciesList.length === 0) {
            selectedPeople['species_details'] = null;
        } else {
            selectedPeople['species_details'] = selectedPeopleSpeciesList[0];
        }
		return selectedPeople;
    }

    /**
     * Finds species from the list
     * @param   {Array<Species>} speciesList 
     * @param   {string}         url 
     * @returns {string}
     */
    private findSpeciesDetailFromList(speciesList : Array<Species>, url : String) : Species {
        let speciesDetail : Species;
        speciesList.forEach((species : Species) => {
            if (species.url === url) {
                speciesDetail = species;
            }
        });
        return speciesDetail;
    }

    /**
     * Finds film from the list
     * @param   {Array<Film>} filmList 
     * @param   {string}         url 
     * @returns {string}
     */
     private findFilmDetailFromList(filmList : Array<Film>, url : String) : Film {
        let filmDetail : Film;
        filmList.forEach((film : Film) => {
            if (film.url === url) {
                filmDetail = film;
            }
        });
        return filmDetail;
    }
}