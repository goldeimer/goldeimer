import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Observable, throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'

const API_ENDPOINT = 'http://goldeimer.de/wp-json/goldeimer/v1/tree-count'

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    getTreeCount = () => this.httpClient.get(API_ENDPOINT).pipe(
        retry(2),
        catchError(this.handleError)
    )

    handleError = (error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
            console.error('Failed to fetch data:', error.error.message)
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`)
        }

        return throwError('Service unavailable. Please try again later.')
    }
}
