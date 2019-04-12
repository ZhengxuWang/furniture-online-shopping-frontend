import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../shared/services/auth.service';
import {Router} from '@angular/router';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  err = false;
  registerFormGroup: FormGroup;
  user: User = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private us: UserService,
    public snackBar: MatSnackBar
  ) {
  }

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
            this.router.navigate(['/edituser']);
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'bottom';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Add User Success', undefined, config);
          } else {
            // show error text.
          }
        }, (err) => { // error handling
          this.err = true;
        });
    } else {
      return false;
    }
  }

  passwordValidator({value}: FormGroup) {
    const {password, confirm_password} = value;
    return password === confirm_password ? null : {passwordGroup: 'Passwords don\'t match!'};
  }

  onDeleteSubmit(value) {
    this.us.getUsers().subscribe(res => {
      res.forEach(user => {
        if (user.username === value.username) {
          console.log(user.id);
          this.us.deleteUser(user.id).subscribe((rest) => {
            console.log(rest);
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'bottom';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Delete Success', undefined, config);
          });
        }
      });
    });
  }

  onAuthorizeSubmit(value) {
    this.us.getUsers().subscribe(res => {
      // console.log(res);
      res.forEach(user => {
        if (user.username === value.username) {
          if (value.ROLE_ADMIN) {
            // console.log(user.id);
            this.authService.setAdmin(user.id).subscribe();
            const config = new MatSnackBarConfig();
            config.verticalPosition = 'bottom';
            config.horizontalPosition = 'center';
            config.duration = 5000;
            this.snackBar.open('Authorize Success', undefined, config);
          }
        }
      });
    });
  };
}
