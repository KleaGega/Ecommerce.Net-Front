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
import { ProductsEdit } from './products-edit/products-edit';
import { ProductsDelete } from './products-delete/products-delete';
import { Categories } from './categories/categories';
import { CategoryCreate } from './category-create/category-create';
import { CategoryEdit } from './category-edit/category-edit';
import { CategoryDelete } from './category-delete/category-delete';
import { Cart } from './cart/cart';
import { Profile } from './profile/profile';

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
  {path:'edit-product/:id',component:ProductsEdit},
  {path:'delete-product/:id',component:ProductsDelete},
  {path:'categories',component: Categories},
  {path:'create-category', component: CategoryCreate},
  {path: 'edit-category/:id', component:CategoryEdit},
  {path:'delete-category/:id',component:CategoryDelete},
  {path: 'cart', component:Cart},
  {path: 'profile', component:Profile},
  { path: '**', redirectTo: '' } 
];
