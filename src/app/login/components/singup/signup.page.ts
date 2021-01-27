import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-sing-up-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})

export class SignupPage implements OnInit {
  public form: FormGroup;

  public passwordLength = 6;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(this.passwordLength),
      ]],
      confirmPassword: ['', [
        this.confirmPassword()
      ]]
    });
  }

  public async signUp() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      const success = await this._loginService.signUp(
        this.form.get('email').value,
        this.form.get('password').value
      );

      if (success) {
        this.goToHome();
      }
    }
  }

  private goToHome(): void {
    this._router.navigate(['']);
  }

  private confirmPassword(): (control: AbstractControl) => {[key: string]: any} | null {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value !== this.form?.get('password').value) {
        return {confirmPassword: true};
      }

      return null;
    };
  }
}
