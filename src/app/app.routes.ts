import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AboutUs } from './about-us/about-us';
import { ContactUs } from './contact-us/contact-us';
import { OurTeam } from './our-team/our-team';
import { Products } from './products/products';
import { Privacy } from './privacy/privacy';
import { Login } from './login/login';
import { Register } from './register/register';
import { ChangePassword } from './change-password/change-password';
import { VerifyEmail } from './verify-email/verify-email';
import { ProductsDetails } from './products-details/products-details';
import { ProductsCreate } from './products-create/products-create';

export const routes = [
  { path: '', component: Home },
  { path: 'about-us', component: AboutUs },
  { path: 'contact-us', component: ContactUs },
  { path: 'our-team', component: OurTeam },
  { path: 'products', component: Products },
  { path: 'privacy', component: Privacy },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  {path:'login',component: Login},
  {path: 'change-password', component:ChangePassword},
  {path:'verify-email',component:VerifyEmail},
  {path:'product-detail/:id',component:ProductsDetails},
  {path:'create-product',component:ProductsCreate},
  { path: '**', redirectTo: '' } 
];
