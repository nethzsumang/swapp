import JSONModel from "sap/ui/model/json/JSONModel";
import SpeciesRepository from "../repository/Species.repository";

/**
 * SpeciesService
 */
export default class SpeciesService
{
    speciesRepository: SpeciesRepository;

    /**
     * Constructor
     */
    constructor() {
        this.speciesRepository = new SpeciesRepository();
    }

    /**
     * Gets species
     * @returns {Promise<JSONModel>}
     */
    public async getSpecies(): Promise<JSONModel> {
        return await this.speciesRepository.getSpecies();
    }
}