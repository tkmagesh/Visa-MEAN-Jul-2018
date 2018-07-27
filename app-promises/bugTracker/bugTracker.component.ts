import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';


@Component({
	selector : 'app-bug-tracker',
	templateUrl : './bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs : Bug[] = []; 
	
	

	sortBugBy : string = 'name';

	sortBugDescending : boolean = false;

	

	constructor(private bugOperationsService : BugOperationsService){
		
	}



	onNewBugAdded(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}

	/*ngOnInit(){
		this.bugOperationsService
			.getAll()
			.then(bugs => this.bugs = bugs);
	}
	
	onBugNameClick(bugToToggle : Bug){
		this.bugOperationsService
			.toggle(bugToToggle)
			.then(toggledBug => this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug));
	}

	onRemoveClosedClick(){
		let allPromsies = this.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => {
				this.bugOperationsService
					.remove(closedBug)
					.then(_ => this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id));
			});
		
	}*/

	async ngOnInit(){
		let bugs = await this.bugOperationsService.getAll();
		this.bugs = bugs;
	}
	
	async onBugNameClick(bugToToggle : Bug){
		let toggledBug = await this.bugOperationsService.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug === bugToToggle ? toggledBug : bug);
	}

	onRemoveClosedClick(){
		let allPromsies = this.bugs
			.filter(bug => bug.isClosed)
			.forEach(async closedBug => {
				await this.bugOperationsService.remove(closedBug);
				this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id);
			});
		
	}

}