import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;
  generatedOtp: string = '';

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
      return true;
    }
    return false;
  }

  logout() {
    this.user = null;
  }
}