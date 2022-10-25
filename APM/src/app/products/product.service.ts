import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  // Using a JSON file for this example. If want to use a API http, replace the productUrl with the actual API request line
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  // Observale to retrieve the data from the api. 
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      // tap is tapping into the data, and catching an error if there is an issue. 
      tap(data => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // A method to handle the error, since this is called within our Observable. 
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occured: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}