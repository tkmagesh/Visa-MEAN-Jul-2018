import { Component, Output, EventEmitter } from '@angular/core';
import { BugOperationsService } from '../services/bugOperations.service';
import { Bug } from '../models/Bug';
 
import axios from 'axios';

@Component({
	selector : 'app-bug-edit',
	template : `
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" [(ngModel)]="newBugName">
			<input type="button" value="Add New" (click)="onAddNewClick()">
		</section>
	`
})
export class BugEditComponent{
	
	newBugName : string = '';

	@Output()
	bugAdded : EventEmitter<Bug> = new EventEmitter<Bug>();

	constructor(private bugOperationsService : BugOperationsService){

	}

	onAddNewClick(){
		this.bugOperationsService
			.createNew(this.newBugName)
			.subscribe(newBug => this.bugAdded.emit(newBug));
		
		
	}


}