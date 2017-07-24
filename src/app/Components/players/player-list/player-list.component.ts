import {Component} from '@angular/core';
import {Player} from '../shared/players.model';
import {PlayersService} from '../shared/players.service';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.css'],
    providers: [PlayersService]
})
export class PlayerListComponent {
    players: Player[];

    constructor(private playersService: PlayersService) {
        this.playersService.get().subscribe((players) => {
            this.players = players.sort((a, b) => {
                return b.id - a.id;
            });
        });
    }

}
