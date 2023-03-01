import { Injectable } from '@angular/core'
import { Team } from 'src/models/team.interface';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private electronService : ElectronService){}

    createTeam(team : Team) : Team{
        return team
    }

    getTeams() : Team[]{
        const team1 : Team = {
            id : 1,
            name : "Team 1",
            picture : "https://www.pngmart.com/files/13/Mario-PNG-Transparent-Image.png"
        }

        const team2 : Team = {
            id : 2,
            name : "Team 2",
            picture : "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387__480.png"
        }

        return [team1, team2]
    }
}