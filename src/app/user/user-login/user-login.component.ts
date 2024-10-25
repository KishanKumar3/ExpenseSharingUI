import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  
  constructor(private authService: AuthService , private alertifyService: AlertifyService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }


  onLogin(loginForm: NgForm) {
    // console.log(loginForm.value);
    this.authService.loginUser(loginForm.value).subscribe(
      (response) => {
        // console.log(response);
        const token = response.token;
        
        localStorage.setItem('token', token)
        const user = this.authService.decodedToken();
        this.authService.setCurrentUser(user);
        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
        });
        this.router.navigate(['/manage-groups']);
      },
      (error) => {
        this.snackBar.open('Invalid Credentials', 'Close', {
          duration: 3000,
        });
      }
      
    );
  }
}
