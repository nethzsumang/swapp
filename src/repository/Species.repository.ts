import JSONModel from "sap/ui/model/json/JSONModel";
import Species from "../interfaces/Species.interface";

/**
 * Species Repository
 */
export default class SpeciesRepository
{
    SWAPI_URL = 'https://swapi.dev/api/';

    /**
     * Gets species list from SWAPI
     * @param   {Object}  params
     * @returns {Promise<JSONModel>}
     */
    public async getSpecies(params : Object = {}) : Promise<JSONModel> {
        let speciesList : Species[] = [];
        let page = 1;
        let hasNext : boolean = false;
        do {
            const response = await window.axios.get(this.SWAPI_URL + 'species' + '?page=' + page);
            const responseData = response.data;
            if (responseData.results !== undefined) {
                hasNext = responseData.next !== null;
                speciesList = [...speciesList, ...responseData.results];
                page++;
            } else {
                hasNext = false;
            }
        } while (hasNext === true);

        return new JSONModel({
            results: speciesList
        });
    }
}