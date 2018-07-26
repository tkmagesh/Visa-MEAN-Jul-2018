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

	//bugOperationsService : BugOperationsService = null;

	constructor(private bugOperationsService : BugOperationsService){
		//this.bugOperationsService = bugOperations;
	}

	onAddNewClick(){
		let newBug : Bug = this.bugOperationsService.createNew(this.newBugName);
		this.bugs.push(newBug);
		this.newBugName = '';
	}

	onBugNameClick(bug){
		this.bugOperationsService.toggle(bug);
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

}