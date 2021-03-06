import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignupPage } from './components/singup/signup.page';
import { SigninPage } from './components/signin/signin.page';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SigninPage
      },
      {
        path: 'signup',
        component: SignupPage
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule {}

