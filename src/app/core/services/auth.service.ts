import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  generatedOtp: string = '';
  private isLoggedIn = false;

  private userMobile: string = '';

  constructor(private router: Router) {
    this.loadSession(); //
  }


  sendOtp(mobile: string) {
    // 🔥 generate 4 digit OTP
    this.generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();

    console.log('OTP:', this.generatedOtp); // show in console for testing
  }

  verifyOtp(otp: string, mobile: string): boolean {
    if (otp === this.generatedOtp) {
      this.user = {
        name: 'User',
        mobile: mobile
      };
      this.isLoggedIn = true;
      this.userMobile = mobile;
      this.router.navigate(['/home']);

      // ✅ store in session
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userMobile', mobile);
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    this.userMobile = '';
    // ✅ clear session
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }


  getUserMobile(): string {
    return this.userMobile;
  }

  private loadSession() {
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    const mobile = sessionStorage.getItem('userMobile');

    if (loggedIn === 'true' && mobile) {
      this.isLoggedIn = true;
      this.userMobile = mobile;
    }
  }
}