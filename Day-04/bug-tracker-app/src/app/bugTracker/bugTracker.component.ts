import { Component } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';
import axios from 'axios';

console.log(axios);

@Component({
	selector : 'app-bug-tracker',
	templateUrl : './bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];
	
	

	sortBugBy : string = 'name';

	sortBugDescending : boolean = false;

	//bugOperationsService : BugOperationsService = null;

	constructor(private bugOperationsService : BugOperationsService){
		//this.bugs = this.bugOperationsService.getAll();
		/*var p = axios.get('http://localhost:3000/bugs');
		var p2 = p.then(function(response){ 
			return response.data;
		});
		
		p2.then(data => this.bugs = data);*/

		axios.get('http://localhost:3000/bugs')
			.then(response => response.data)
			.then(bugs => this.bugs = bugs);
	}

	onNewBugAdded(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}
	
	onBugNameClick(bugToToggle : Bug){
		//let toggledBug = this.bugOperationsService.toggle(bugToToggle);
		let toggledBugData = {...bugToToggle, isClosed : !bugToToggle.isClosed};
		axios.put(`http://localhost:3000/bugs/${toggledBugData.id}`, toggledBugData)
			.then(response => response.data)
			.then(toggledBug => this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug));
		;
	}

	onRemoveClosedClick(){
		let allPromsies = this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => {
				axios
					.delete(`http://localhost:3000/bugs/${closedBug.id}`)
					.then(_ => this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id));
			});
		
	}

}