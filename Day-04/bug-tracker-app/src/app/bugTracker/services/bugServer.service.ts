import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BugServerService{
	
	private baseUrl = 'http://localhost:3000/bugs';

	constructor(private httpClient : HttpClient){

	}
	save(bugData : Bug) : Observable<Bug>{
		if (bugData.id === 0){
			return this.httpClient
				.post<Bug>(this.baseUrl, bugData)
				
		} else {
			return this.httpClient
				.put<Bug>(`${this.baseUrl}/${bugData.id}`, bugData);
				
		}
	}

	getAll() : Observable<Bug[]>{
		return this.httpClient
			.get<Bug[]>(this.baseUrl);
		
	}

	remove(bugData : Bug) : Observable<any>{
		return this.httpClient
			.delete<any>(`${this.baseUrl}/${bugData.id}`);
				
	}

}

