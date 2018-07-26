import { Component } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : './bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];
	
	newBugName : string = '';

	sortBugBy : string = 'name';

	sortBugDescending : boolean = false;

	//bugOperationsService : BugOperationsService = null;

	constructor(private bugOperationsService : BugOperationsService){
		//this.bugOperationsService = bugOperations;

		this.bugs.push(this.bugOperationsService.createNew('Server communication failure'));
		this.bugs.push(this.bugOperationsService.createNew('Data integrity checks failed'));
		this.bugs.push(this.bugOperationsService.createNew('User actions not recognized'));

	}

	onAddNewClick(){
		let newBug : Bug = this.bugOperationsService.createNew(this.newBugName);
		this.bugs = [...this.bugs , newBug];
		this.newBugName = '';
	}

	onBugNameClick(bugToToggle : Bug){
		let toggledBug = this.bugOperationsService.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

}