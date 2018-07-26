import { Pipe , PipeTransform } from '@angular/core';


interface Comparer{
	(item1 : any, item2 : any) : number
}

@Pipe({
	name : 'sort'
})
export class SortPipe implements PipeTransform{
	private getComparer(attrName : string ) : Comparer {
		return function(item1 : any, item2 : any) : number{
			if (item1[attrName] < item2[attrName]) return -1;
			if (item1[attrName] > item2[attrName]) return 1;
			return 0
		}
	}
	private getDescendingComparer(comparer) : Comparer{
		return function(item1 : any, item2 : any) : number{
			return comparer(item1, item2) * -1;
		}
	}

	transform(data : any[], attrName : string, isDescending : boolean = false ) : any[]{
		console.log('sort.transform triggered with ', arguments);

		if (!data || !attrName) return data;
		let comparer = this.getComparer(attrName);
		if (isDescending)
			comparer = this.getDescendingComparer(comparer);
		data.sort(comparer);
		return data;
	}
}