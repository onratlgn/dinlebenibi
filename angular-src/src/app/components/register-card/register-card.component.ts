import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.css']
})
export class RegisterCardComponent implements OnInit {
  name: String;
  surname: String;
  username: String;
  email: String;
  password: String;
  city: String;
  district: String;
  address: String;
  phone: Number;


  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const trainer = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      username: this.username,
      password: this.password,
      phone: this.phone,
      city: this.city,
      district: this.district,
      address: this.address
    }

    // Required Fields
    if (!this.validateService.validateRegister(trainer)) {
      this.flashMessage.show('Please fill in all fields', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(trainer.email)) {
      this.flashMessage.show('Please use a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }

    // Register user
    this.authService.registerTrainer(trainer).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('You are now registered and can now login', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register-page']);
      }
    });
  }
}
