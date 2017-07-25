import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Player} from '../shared/players.model';
import {PlayersService} from '../shared/players.service';

import 'rxjs/add/operator/startWith';

@Component({
    selector: 'app-player-search',
    templateUrl: './player-search.component.html',
    styleUrls: ['./player-search.component.scss'],
    providers: [PlayersService]
})

export class PlayerSearchComponent {
    players: Array<Player> = [];
    filteredPlayers: any;
    playerFormControl: FormControl;

    constructor(private playersService: PlayersService) {
        this.playerFormControl = new FormControl();

        this.playersService.get().subscribe((players) => {
           this.players = players;

           this.playerFormControl.valueChanges
               .startWith(null)
               .map(value => this.filter(value))
               .subscribe();
        });
    }

    filter(value: string) {
        /*  Checking on existing of the search value */
        return value ? this.players.map((player) => {
            const keys = this.convertObjectToArray(player);
            /*  Splitting search string with parameters and comparing each parameter in loop
                and creating array with 'false' or 'true' values for each parameter */
            const isHidden = value.split(' ').map(param => {

                    /*  Checking each parameter on existing exception */
                    const isException = param.indexOf('-') === 0;
                    /*  Removing '-' symbol if exceptions exist */
                    param = isException ? param.slice(1) : param;
                    /*  Checking of the occurrence of the parameter to string with object values */
                    const isCompare = keys.toLowerCase().indexOf(param.toLowerCase()) >= 0;
                    /*  Returning 'false' if (is exception and parameter is included
                     in the string with object values) or (is not exception and parameter
                     is included in the string with object values), else returning 'true' */
                    return isCompare && isException || !isCompare && !isException ? true : false;
                /*  Returning 'false' if at least one value in array is false */
            }).indexOf(true) >= 0 ? true : false;
            player['hidden'] = isHidden;
            return player;

        }) : this.players.map((player) => {
            player['hidden'] = false;
            return player;
        });
    }

    /*  Converting object to string with spaces between values */
    convertObjectToArray(obj: object) {
        let keys = '';
        const allowedParams = ['name', 'position', 'nationality'];
        for (const key of Object.keys(obj)) {
            /* Enable filtering if param included to allowedParams  */
            if (allowedParams.indexOf(key) >= 0) {
                keys += ' ' + obj[key];
            }
        }
        return keys;
    }
}
