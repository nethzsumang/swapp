import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import BaseController from "./BaseController";
import BindingMode from "sap/ui/model/BindingMode";

import PeopleService from '../service/People.service';
import FilmService from '../service/Film.service';
import SpeciesService from "../service/Species.service";
import State from '../interfaces/State.interface';

/**
 * @namespace com.kennethsumang.swapp.controller
 */
export default class Main extends BaseController {

	peopleService : PeopleService;
	filmService : FilmService;
	speciesService : SpeciesService;

	async onInit() {
		this.peopleService = new PeopleService();
		this.filmService = new FilmService();
		this.speciesService = new SpeciesService();
		
		this.getView().setModel(await this.peopleService.getPeopleList(), 'peopleList');
		this.getView().setModel(this.filmService.getFilms({}), 'filmList');
		this.getView().setModel(await this.speciesService.getSpecies(), 'speciesList');

		// state data model
		let stateModel = new JSONModel({});
		stateModel.setDefaultBindingMode(BindingMode.OneWay);
		this.getView().setModel(stateModel, 'state');
		console.log(this.getView().getModel('peopleList').getProperty('/results'));
	}
	
	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public handleListItemClick(event : Event, name : string) : void {
		event.preventDefault();

		let newStateObject : State = {};

		const peopleList = this.getView().getModel('peopleList').getProperty('/results');
		const filmList = this.getView().getModel('filmList').getProperty('/results');
		const speciesList = this.getView().getModel('speciesList').getProperty('/results');

		const selectedPeopleDetails = this.peopleService.findDetailsFromList({
			peopleList: peopleList,
			filmList: filmList,
			speciesList: speciesList
		}, name);
		newStateObject['selectedPeople'] = selectedPeopleDetails;

		let newState = new JSONModel(newStateObject);
		newState.setDefaultBindingMode(BindingMode.OneWay);
		this.getView().setModel(newState, 'state');
		console.log(this.getView().getModel('state'));
	}
}
