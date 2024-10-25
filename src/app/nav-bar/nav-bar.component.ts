import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../model/IUser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  userName!: string ;
  userBalance!: number;
  isLoggedIn = false;
  isAdmin = false; 

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.isLoggedIn = true;
        this.fetchUserDetails(user.UserId);
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  fetchUserDetails(userId: string): void {
    this.userService.getUserDetails(userId).subscribe(
      (userDetails: User) => {
        this.userName = userDetails.name;
        this.userBalance = userDetails.balance;
        this.isAdmin = userDetails.role === 'Admin';
      },
      error => {
        console.error('Failed to fetch user details', error);
      }
    );
  }

  refreshUserDetails(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        this.fetchUserDetails(user.UserId);
      }
    });
  }


  // ngOnInit(): void {
  //   this.authService.getCurrentUser().subscribe(user => {
  //     // console.log(user)
  //     if (user) {
  //       this.isLoggedIn = true;
  //       const userId = user.UserId;
  //       this.userService.getUserDetails(userId).subscribe(
  //         (userDetails: User) => {
  //           console.log(userDetails)
  //           this.userName = userDetails.name;
  //           this.userBalance = userDetails.balance;
  //           this.isAdmin = userDetails.role === 'Admin';
  //         },
  //         error => {
  //           console.error('Failed to fetch user details', error);
  //         }
  //       );
  //     } else {
  //       this.isLoggedIn = false;
  //     }
  //   });
  // }

  balance(): void {
    this.router.navigate(['/balances'])
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
