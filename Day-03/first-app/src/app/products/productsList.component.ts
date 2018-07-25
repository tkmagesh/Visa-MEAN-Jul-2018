import { Component } from '@angular/core';

@Component({
	selector : 'app-products',
	templateUrl : 'productList.component.html'
})
export class ProductListComponent{
	products : string[] = ['Pen', 'Pencil', 'Marker'];
}