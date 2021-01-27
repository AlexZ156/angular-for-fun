import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'kt-sing-in-page',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss']
})

export class SigninPage implements OnInit {
  public form: FormGroup;

  public errorMessage: string;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public async signIn(): Promise<void> {
    this.form.markAllAsTouched();
    const formIsInvalid = this.form.invalid;

    if (formIsInvalid) {
      return;
    }

    const successLogin = await this._loginService.singIn(
      this.form.get('email').value,
      this.form.get('password').value
    );

    if (successLogin) {
      this.goToHome();
    } else {
      this.errorMessage = 'Incorrect username or password.';
    }
  }

  goToHome(): void {
    this._router.navigate([''], { replaceUrl: true });
  }
}
