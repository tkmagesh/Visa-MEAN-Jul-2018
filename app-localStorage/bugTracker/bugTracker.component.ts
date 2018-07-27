import { Component } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';

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
		this.bugs = this.bugOperationsService.getAll();

	}

	onNewBugAdded(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}
	
	onBugNameClick(bugToToggle : Bug){
		let toggledBug = this.bugOperationsService.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => this.bugOperationsService.remove(closedBug));
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

}