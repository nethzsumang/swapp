import JSONModel from "sap/ui/model/json/JSONModel";
import FilmRepository from "../repository/Film.repository";

/**
 * Film Service class
 */
export default class FilmService
{
    filmRepository: FilmRepository;

    /**
     * Constructor
     */
    constructor() {
        this.filmRepository = new FilmRepository();
    }

    /**
     * Gets films from film repository
     * @param   {Object} params 
     * @returns {JSONModel}
     */
    public getFilms(params : Object) : JSONModel {
        return this.filmRepository.getFilms(params, false);
    }
}