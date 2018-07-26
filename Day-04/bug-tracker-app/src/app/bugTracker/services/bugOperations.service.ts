import { Bug } from '../models/Bug';

export class BugOperationsService{
	createNew(bugName) : Bug {
		let newBug : Bug = {
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		return newBug;
	}
	toggle(bugToToggle : Bug) : void{
		bugToToggle.isClosed = !bugToToggle.isClosed;
	}
}