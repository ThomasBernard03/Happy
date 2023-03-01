import { Injectable } from '@angular/core'
import { Project } from 'src/models/project.interface';
import { ElectronService } from './electron.service';

@Injectable({
    providedIn: 'root'
})
export class TeamService {

    constructor(private electronService : ElectronService){}

    createTeam(team : Project) : Project{
        const teams = this.getTeams();

        teams.push(team)

        localStorage.setItem("teams", JSON.stringify(teams))

        return team
    }

    getTeams() : Project[]{
        const rawData = localStorage.getItem("teams")

        if(rawData != null){
            const teams : Project[] = JSON.parse(rawData)
            return teams
        }
        else {
            return []
        }
    }
}