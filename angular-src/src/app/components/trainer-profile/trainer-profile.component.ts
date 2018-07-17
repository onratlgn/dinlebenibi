
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class TrainerProfileComponent implements OnInit {
  trainer:Object;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    this.authService.getTrainerProfile().subscribe(profile => {
      this.trainer = profile.trainer;
    },
     err => {
       console.log(err);
       return false;
     });
  }

}
