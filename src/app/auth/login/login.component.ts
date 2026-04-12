import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {

  mobile = '';
  otp = '';
  otpSent = false;


  constructor(public authService: AuthService, private router: Router) { }

  sendOtp() {
    if (this.mobile.length === 10) {
      this.authService.sendOtp(this.mobile);
      this.otpSent = true;
    } else {
      alert('Enter valid mobile number');
    }

  }

  verifyOtp() {
    const success = this.authService.verifyOtp(this.otp, this.mobile);

    if (success) {
      this.router.navigate(['/home']); // ✅ redirect

    } else {
      alert('Invalid OTP');
    }
  }
}
