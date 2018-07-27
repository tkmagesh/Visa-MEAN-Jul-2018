import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugServerService } from './bugServer.service';

@Injectable()
export class BugOperationsService{
	constructor(private bugServer : BugServerService){

	}
	getAll() : Promise<Bug[]>{
		return this.bugServer.getAll();
	}
	createNew(bugName) : Promise<Bug> {
		let newBugData : Bug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		return this.bugServer.save(newBugData);
	}
	toggle(bugToToggle : Bug) : Promise<Bug>{
		let toggledBug = {...bugToToggle, isClosed : !bugToToggle.isClosed};
		return this.bugServer.save(toggledBug);
	}
	remove(bug : Bug) : Promise<any>{
		return this.bugServer.remove(bug);
	}
}