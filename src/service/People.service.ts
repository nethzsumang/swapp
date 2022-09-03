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
        selectedPeople['species'] = selectedPeople['species'].map((speciesUrl : string) => {
            return this.findSpeciesNameFromList(objectList['speciesList'], speciesUrl);
        });
        selectedPeople['films'] = selectedPeople['films'].map((filmUrl : string) => {
            return this.findFilmNameFromList(objectList['filmList'], filmUrl);
        });
		return selectedPeople;
    }

    /**
     * Finds species from the list
     * @param   {Array<Species>} speciesList 
     * @param   {string}         url 
     * @returns {string}
     */
    private findSpeciesNameFromList(speciesList : Array<Species>, url : String) : string {
        let speciesName = '';
        speciesList.forEach((species : Species) => {
            if (species.url === url) {
                speciesName = species.name;
            }
        });
        return speciesName;
    }

    /**
     * Finds film from the list
     * @param   {Array<Film>} filmList 
     * @param   {string}         url 
     * @returns {string}
     */
     private findFilmNameFromList(filmList : Array<Film>, url : String) : string {
        let filmName = '';
        filmList.forEach((film : Film) => {
            if (film.url === url) {
                filmName = film.title;
            }
        });
        return filmName;
    }
}