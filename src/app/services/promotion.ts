import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { myBaseURL } from '../shared/myBaseURL';
import { map, catchError } from 'rxjs/operators';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
    providedIn: 'root'
})
export class PromotionService {

    constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }
    getPromotions(): Observable<Promotion[]> {
        // return of(PROMOTIONS).pipe(delay(2000));

        return this.http.get<Promotion[]>(myBaseURL + 'promotions')
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPromotion(id: any): Observable<Promotion> {
        // return new Promise(resolve=> {
        //   // Simulate server latency with 2 second delay
        //     setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id == id))[0]), 2000);
        // });
        // return of(PROMOTIONS.filter((promo) => (promo.id == id))[0]).pipe(delay(2000));
        return this.http.get<Promotion>(myBaseURL + 'promotions/' + id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedPromotion(): Observable<Promotion> {
        //  return new Promise(resolve=> {
        //   // Simulate server latency with 2 second delay
        //     setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.featured))[0]), 2000);
        // });

        // return of(PROMOTIONS.filter((promo) => (promo.featured))[0]).pipe(delay(2000));
        return this.http.get<Promotion[]>(myBaseURL + 'promotions?featured=true')
            .pipe(map(dishes => dishes[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }
}