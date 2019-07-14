import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DivisionService } from 'src/app/services/division.service';
import { StandingsService } from 'src/app/services/standings.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TeamService } from 'src/app/services/team.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-results-tiles',
  templateUrl: './results-tiles.component.html',
  styleUrls: ['./results-tiles.component.css']
})
export class ResultsTilesComponent implements OnInit {

  constructor(private divisionService: DivisionService, private standingsService: StandingsService, private scheduleService: ScheduleService, public team: TeamService, public util: UtilitiesService) { }
  divisions: any = [];
  standings: any[] = [];

  ngOnInit() {
  }

  provMatches = [];

  @Input() set matches(val) {
    if (val != undefined && val != null) {
      this.provMatches = val;
    }
  }

  dominator(match, side){
        let ret =false;
    if(match.forfeit){
      let ret = false;
    }else{
      if(side == 'home'){
        if(match.home.score==2 && match.away.score == 0){
          ret = true;
        }
      }else{
        if (match.away.score == 2 && match.home.score == 0) {
          ret = true;
        }
      }
    }
    return ret;
  }

  // forfeit(match, side){
  //   let ret ='';
  //   if (match.forfeit) {
  //     if (match[side].score == 0) {
  //       ret = 'F';
  //     }
  //   }
  //   return ret;
  // }
  forfeit(match, side) {
    let ret = false;
    if (match.forfeit) {
      if (match[side].score == 0) {
        ret = true;
      }
    }
    return ret;
  }

  resultText(match){
    let ret = null;
    if(match.forfeit){
      ret = "Forfeit";
    } else if (match.home.score == 0 && match.away.score == 2 || match.home.score == 2 && match.away.score == 0 ){
      ret = 'Domination';
    }
    return ret;
  }

  /*
    reportScore(match, side){
    let ret;
    if(match.forfeit){
      if(match[side].score==0){
        ret = 'F';
      }else{
        ret = 2;
      }
    }else{
      ret = match[side].score;
    }
    return ret;
  }
  */

  reportScore(match, side){
    let ret;
    if(match.forfeit){
      if(match[side].score==0){
        ret = 0;
      }else{
        ret = 2;
      }
    }else{
      ret = match[side].score;
    }
    return ret;
  }

  selectedDivision: any
  rounds: number[] = [];

}