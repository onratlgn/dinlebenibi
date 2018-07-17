import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-training-register',
  templateUrl: './training-register.component.html',
  styleUrls: ['./training-register.component.css']
})
export class TrainingRegisterComponent implements OnInit {
  owner: String;
  name: String;
  quota: Number;
  date: Date;
  tags: [String];

  constructor( private router: Router,
               private authService: AuthService,
               private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getTrainerProfile().subscribe(profile => {
      this.owner = profile.trainer.username;
    },
     err => {
       console.log(err);
       return false;
     });

  }

  onTrainingRegisterSubmit() {
    const training = {
      owner: this.owner ,
      name: this.name,
      quota: this.quota,
      date: this.date,
      tags: ["de" ,"pe"]
    }


    // Register training
    this.authService.registerTraining(training).subscribe(data => {
    if(data.success) {
      this.flashMessage.show('You are now registered a training', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/dashboard']);
    } else {
      this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/']);
    }
  });
  }
}
