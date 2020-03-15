import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Match } from '../../classes/match.class';
import { MvpService } from 'src/app/services/mvp.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-potg-display",
  templateUrl: "./potg-display.component.html",
  styleUrls: ["./potg-display.component.css"]
})
export class PotgDisplayComponent implements OnInit {
  constructor(
    private ScheduleServ: ScheduleService,
    private MvpServ: MvpService,
    public auth:AuthService
  ) {}

  @Input() potg ;

  @Input() match;

  @Input() showPotg:boolean = true;

  @Input() showMvp:boolean = false;

  @ViewChild("potgContainer") container: ElementRef;

  loadReady=false;

  matchInfo: Match = new Match();
  ngOnInit(): void {
    if (this.potg && !this.match) {
      this.ScheduleServ.getMatchInfo(this.potg.match_id).subscribe(res => {
        this.matchInfo = res;
        this.correctAutoPlay();
      });
    }else if(this.match && !this.potg){
      this.matchInfo = this.match;
      this.MvpServ.getMvpById('match_id', this.match.matchId).subscribe(res=>{
        console.log('potg ', res);
        this.potg = res;
        this.correctAutoPlay();
      })
    }else{
      this.matchInfo = this.match;
      this.correctAutoPlay();
      console.log('potg_link', this.potg.potg_link);
    }
  }

  eleHeight;
  ngAfterViewInit() {
    this.eleHeight = (this.container.nativeElement.offsetWidth / 16) * 9;
    this.loadReady=true;
  }


  correctAutoPlay(){
        if (this.potg.potg_link) {
          if (this.potg.potg_link.includes("twitch.tv")) {
            if (!this.potg.potg_link.includes("autoplay")) {
              this.potg.potg_link += "&autoplay=false";
            }
          }
          if(!this.potg.potg_link.includes('https://')){
            this.potg.potg_link = `https://${this.potg.potg_link}`;
          }
        }
  }

  smile(id) {
    this.MvpServ.upvotePotg(id).subscribe(
      res => {
        if (this.potg.likes) {
          this.potg.likes += 1;
        } else {
          this.potg.likes = 1;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
