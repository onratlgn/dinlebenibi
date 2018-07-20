import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  onSignSubmit(){
    this.router.navigate(['/register-page']);
  }

}
