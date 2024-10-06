import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { CarsComponent } from './components/cars/cars.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { PostComponent } from './components/post/post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { OrdersComponent } from './components/orders/orders.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { CarChartComponent } from './components/car-chart/car-chart.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { AllcarsComponent } from './components/allcars/allcars.component';
import { AllpostsComponent } from './components/allposts/allposts.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { AllreviewsComponent } from './components/allreviews/allreviews.component';
import { LogoutComponent } from './components/logout/logout.component';


const routes: Routes = [
  { path: '', redirectTo: '/main-section', pathMatch: 'full' }, 
  { path: 'main-section', component: MainSectionComponent },
  { path:'register',component:RegisterComponent},
  { path:'login',component:LoginComponent},
  { path: 'user-dashboard', component:UserDashboardComponent},
  { path: 'update-profile/:person_id' , component:UpdateProfileComponent},
  { path: 'cars', component:CarsComponent},
  { path: 'new-car', component:NewCarComponent},
  { path: 'edit-car/:car_id', component:EditCarComponent},
  { path: 'post', component:PostComponent},
  { path: 'new-post', component:NewPostComponent},
  { path: 'edit-post/:post_id', component:EditPostComponent},
  { path: 'new-order/:post_id', component:NewOrderComponent},
  { path: 'orders', component:OrdersComponent},
  { path: 'edit-order/:order_id', component:EditOrderComponent},
  { path: 'reviews', component:ReviewsComponent},
  { path: 'new-review/:post_id',component:NewReviewComponent},
  { path: 'edit-review/:review_id', component:EditReviewComponent},
  { path: 'wishlist', component:WishlistComponent},
  { path: 'post-details/:post_id', component:PostDetailsComponent},
  { path: 'admin-login', component: AdminLoginComponent},
  { path: 'admin-dashboard', component:AdminDashboardComponent},
  { path: 'new-admin', component:NewAdminComponent},
  { path: 'car-chart', component:CarChartComponent},
  { path: 'allusers', component:AllusersComponent},
  { path: 'allcars', component:AllcarsComponent},
  { path: 'allposts', component:AllpostsComponent},
  { path: 'allorders', component:AllordersComponent},
  { path: 'allreviews', component:AllreviewsComponent}, 
  { path: 'logout',component:LogoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
