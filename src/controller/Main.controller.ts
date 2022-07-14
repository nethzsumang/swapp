import MessageBox from "sap/m/MessageBox";
import JSONModel from "sap/ui/model/json/JSONModel";
import BaseController from "./BaseController";

/**
 * @namespace com.kennethsumang.swapp.controller
 */
export default class Main extends BaseController {

	onInit() {
		// swapiModel data model
		let swapiModel = new JSONModel();
		swapiModel.loadData('https://swapi.dev/api/people', {'limit': 100}, false, 'GET', false, true, {});
		this.getView().setModel(swapiModel, 'swapi');
		console.log(this.getView().getModel('swapi'));

		// state data model
		let stateModel = new JSONModel({
			'selectedId': null
		});
		this.getView().setModel(stateModel, 'state');
	}
	
	public sayHello() : void {
		MessageBox.show("Hello World!");
	}

	public handleListItemClick(event : Event) : void {
		console.log(event);
		console.log(event.target);
	}

}
