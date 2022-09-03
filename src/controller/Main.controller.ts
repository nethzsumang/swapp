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
		
		await this.getData();

		// state data model
		let stateModel = new JSONModel({});
		stateModel.setDefaultBindingMode(BindingMode.OneWay);
		this.getView().setModel(stateModel, 'state');
	}

	private async getData() {
		if (localStorage.getItem('swapi_peopleList') === null) {
			const peopleList : JSONModel = await this.peopleService.getPeopleList();
			const peopleListData = peopleList.getProperty('/results');
			localStorage.setItem('swapi_peopleList', JSON.stringify(peopleListData));
		}

		if (localStorage.getItem('swapi_filmList') === null) {
			const filmList : JSONModel= this.filmService.getFilms({});
			const filmListData = filmList.getProperty('/results');
			localStorage.setItem('swapi_filmList', JSON.stringify(filmListData));
		}

		if (localStorage.getItem('swapi_speciesList') === null) {
			const speciesList : JSONModel = await this.speciesService.getSpecies();
			const speciesListData = speciesList.getProperty('/results');
			localStorage.setItem('swapi_speciesList', JSON.stringify(speciesListData));
		}

		const peopleModel = new JSONModel({
			results: JSON.parse(localStorage.getItem('swapi_peopleList'))
		});
		const filmModel = new JSONModel({
			results: JSON.parse(localStorage.getItem('swapi_filmList'))
		});
		const speciesModel = new JSONModel({
			results: JSON.parse(localStorage.getItem('swapi_speciesList'))
		});

		this.getView().setModel(peopleModel, 'peopleList');
		this.getView().setModel(filmModel, 'filmList');
		this.getView().setModel(speciesModel, 'speciesList');
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
