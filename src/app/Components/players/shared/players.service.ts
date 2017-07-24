import {EventEmitter, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Player} from './players.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayersService {
    request$: EventEmitter<any>;

    private playersUrl = '../assets/json/players.json';

    private HandleError(error: any): Promise<any> {
        this.request$.emit('finished');
        return Promise.reject(error.message || error);
    }

    constructor(private http: Http) {
        this.request$ = new EventEmitter();
    }

    get(): Observable<Player[]> {
        this.request$.emit('starting');
        return this.http.get(this.playersUrl)
            .map(response => {
                this.request$.emit('finished');
                return response.json() as Player[];
            })
            .catch(this.HandleError);
    }
}
