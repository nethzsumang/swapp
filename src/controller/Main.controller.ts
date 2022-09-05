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

		// state data model
		let stateModel = new JSONModel({
			loading: false
		});
		stateModel.setDefaultBindingMode(BindingMode.OneWay);
		this.setModel(stateModel, 'state');

		// selectedPeople data model
		let selectedPeopleModel = new JSONModel();
		this.setModel(selectedPeopleModel, 'selectedPeople');
	}

	async onAfterRendering(): Promise<void> {
		this.setJSONModelProperties('state', {loading: true});
		await this.getData();
		this.setJSONModelProperties('state', {loading: false});
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

		this.setModel(peopleModel, 'peopleList');
		this.setModel(filmModel, 'filmList');
		this.setModel(speciesModel, 'speciesList');
	}
	
	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public handleListItemClick(event : Event, name : string) : void {
		event.preventDefault();

		let newStateObject = {};

		const peopleList = this.getModel('peopleList').getProperty('/results');
		const filmList = this.getModel('filmList').getProperty('/results');
		const speciesList = this.getModel('speciesList').getProperty('/results');

		const selectedPeopleDetails = this.peopleService.findDetailsFromList({
			peopleList: peopleList,
			filmList: filmList,
			speciesList: speciesList
		}, name);
		newStateObject = {...selectedPeopleDetails};

		let newState = new JSONModel(newStateObject);
		newState.setDefaultBindingMode(BindingMode.OneWay);
		this.setModel(newState, 'selectedPeople');
		console.log(this.getModel('selectedPeople'));
	}
}
