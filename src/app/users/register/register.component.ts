import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';
import {User} from '../../shared/models/user';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  err = false;
  registerFormGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.registerFormGroup = this.fb.group({
      username: '',
      passwordGroup: this.fb.group({
        password: '',
        confirm_password: ''
      }, {validator: this.passwordValidator})
    });
  }

  onSubmit() {
    if (this.registerFormGroup.valid) {
      const {username, passwordGroup, passwordGroup: {password}} = this.registerFormGroup.value;
      const user: User = new User();
      user.username = username;
      user.password = password;
      this.authService.register(user)
        .subscribe(res => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['/users/login']);
          } else {
            // show error text.
          }
        }, (err) => { // error handling
          this.err = true;
        });
    } else {
      return false;
    }
    const config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 5000;
    this.snackBar.open('Register Success', undefined, config);
  }

  passwordValidator({value}: FormGroup) {
    const {password, confirm_password} = value;
    return password === confirm_password ? null : {passwordGroup: 'Passwords don\'t match!'};
  }

}

