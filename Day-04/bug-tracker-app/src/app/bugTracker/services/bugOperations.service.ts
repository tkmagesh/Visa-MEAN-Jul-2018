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
	toggle(bugToToggle : Bug) : Bug{
		let toggledBug = {...bugToToggle, isClosed : !bugToToggle.isClosed};
		//bugToToggle.isClosed = !bugToToggle.isClosed;
		return toggledBug;
	}
}