import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'

import { throwError } from 'rxjs'
import { catchError, retry } from 'rxjs/operators'

const API_ENDPOINT = 'https://goldeimer.de/wp-json/goldeimer/v1/peoplecounter'

const TMP_API_TOKEN = window.btoa(( 'goldeimer-api-client-user:cSpX yRYR 8W6p aMq1 YVrx XYqb'))

const HEADERS = new HttpHeaders()
    .set('Content-Type', 'application/json')
    // .set('Access-Control-Allow-Origin', '*')
    .set('Authorization', `Basic ${TMP_API_TOKEN}`)

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) {}

    getGivenPledgesCount = () => this.httpClient.get(API_ENDPOINT).pipe(
        retry(2),
        catchError(this.handleError)
    )

    incrementGivenPledgesCount = (
        incrementBy = 1
    ) => this.httpClient.put(
        API_ENDPOINT,
        { incrementBy },
        { headers: HEADERS }
    ).pipe(
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
