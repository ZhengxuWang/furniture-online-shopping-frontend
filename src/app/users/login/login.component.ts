import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  err = false;

  constructor(
    private as: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() { }

  onSubmit(value) {
    this.as.login(value as User)
      .subscribe(res => {
        if (res.success) {
          this.router.navigate(['/products']);
        } else {
          this.err = true;
        }
      });
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Login Success', undefined, config);
  }

  onRegister() {
    this.router.navigate(['/users/register']);
  }

  updateErr() {
    if (this.err) {
      this.err = false;
    }
  }

}
