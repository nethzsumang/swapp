import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * People Repository class
 */
export default class PeopleRepository
{
    /**
     * Gets people list from SWAPI
     * @param   {Object}  params
     * @param   {boolean} isAsync
     * @returns {JSONModel}
     */
    public getPeople(params : Object = {}, isAsync : boolean = true) : JSONModel{
        let swapiModel = new JSONModel();
		swapiModel.loadData('https://swapi.dev/api/people', params, isAsync, 'GET', false, true, {});
        return swapiModel;
    }
}