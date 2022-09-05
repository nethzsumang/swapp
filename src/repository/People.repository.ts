import JSONModel from "sap/ui/model/json/JSONModel";
import People from "../interfaces/People.interface";

/**
 * People Repository class
 */
export default class PeopleRepository
{
    SWAPI_URL = 'https://swapi.dev/api/';

    /**
     * Gets people list from SWAPI
     * @param   {Object} params
     * @returns {JSONModel}
     */
    public async getPeople(params : Object = {}) : Promise<JSONModel> {
        let peopleList : People[] = [];
        let page = 1;
        let hasNext : boolean = false;
        do {
            const response = await window.axios.get(this.SWAPI_URL + 'people' + '?page=' + page);
            const responseData = response.data;
            if (responseData.results !== undefined) {
                hasNext = responseData.next !== null;
                peopleList = [...peopleList, ...responseData.results];
                page++;
            } else {
                hasNext = false;
            }
        } while (hasNext === true);

        return new JSONModel({
            results: peopleList
        });
    }
}