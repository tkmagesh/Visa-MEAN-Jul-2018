import { Component } from '@angular/core';
import { Bug } from './models/Bug';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : './bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs : Bug[] = [];

	onAddNewClick(bugName : string){
		let newBug : Bug = {
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		this.bugs.push(newBug);
	}
}