import { Injectable } from '@angular/core'
import { Team } from 'src/models/team.interface';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private electronService : ElectronService){}

    createTeam(team : Team) : Team{
        const teams = this.getTeams();

        teams.push(team)

        localStorage.setItem("teams", JSON.stringify(teams))

        return team
    }

    getTeams() : Team[]{
        const rawData = localStorage.getItem("teams")

        if(rawData != null){
            const teams : Team[] = JSON.parse(rawData)
            return teams
        }
        else {
            return []
        }
    }
}