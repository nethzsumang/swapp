import People from './People.interface';
import Film from './Film.interface';
import Species from './Species.interface';

/**
 * Object List Params interface
 */
export default interface ObjectListParams {
    peopleList : Array<People>;
    filmList: Array<Film>;
    speciesList: Array<Species>;
}