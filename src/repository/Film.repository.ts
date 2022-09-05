import JSONModel from "sap/ui/model/json/JSONModel";

export default class FilmRepository
{
    /**
     * Gets films list from SWAPI
     * @param   {Object}  params
     * @param   {boolean} isAsync
     * @returns {JSONModel}
     */
     public getFilms(params : Object = {}, isAsync : boolean = true) : JSONModel {
        let swapiModel = new JSONModel();
		swapiModel.loadData('https://swapi.dev/api/films', params, isAsync, 'GET', false, true, {});
        return swapiModel;
    }
}