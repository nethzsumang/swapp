import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import Event from "sap/ui/base/Event";
import BaseController from "./BaseController";
import BindingMode from "sap/ui/model/BindingMode";

/**
 * @namespace com.kennethsumang.swapp.controller
 */
export default class Main extends BaseController {

	onInit() {
		// swapiModel data model
		let swapiModel = new JSONModel();
		swapiModel.loadData('https://swapi.dev/api/people', {}, true, 'GET', false, true, {});
		this.getView().setModel(swapiModel, 'swapi');

		// state data model
		let stateModel = new JSONModel({});
		stateModel.setDefaultBindingMode(BindingMode.OneWay);
		this.getView().setModel(stateModel, 'state');
	}
	
	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public handleListItemClick(event : Event, name : string) : void {
		const peopleList = this.getView().getModel('swapi').getProperty('/results');
		let selectedPeople = {};
		peopleList.forEach((people : People) => {
			if (people.name === name) {
				selectedPeople = people;
			}
		});
		let newState = new JSONModel(selectedPeople);
		newState.setDefaultBindingMode(BindingMode.OneWay);
		this.getView().setModel(newState, 'state');
	}

}
