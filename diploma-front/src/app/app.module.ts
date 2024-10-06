import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { HexagonsComponent } from './components/hexagons/hexagons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CheckmarksComponent } from './components/checkmarks/checkmarks.component';
import { FooterComponent } from './components/footer/footer.component';
import { RrethNeshComponent } from './components/rreth-nesh/rreth-nesh.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { CarsComponent } from './components/cars/cars.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { PostComponent } from './components/post/post.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { OrdersComponent } from './components/orders/orders.component';
import { NewOrderComponent } from './components/new-order/new-order.component';
import { EditOrderComponent } from './components/edit-order/edit-order.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { EditReviewComponent } from './components/edit-review/edit-review.component';
import { NewReviewComponent } from './components/new-review/new-review.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewAdminComponent } from './components/new-admin/new-admin.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CarChartComponent } from './components/car-chart/car-chart.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { AllcarsComponent } from './components/allcars/allcars.component';
import { AllpostsComponent } from './components/allposts/allposts.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { AllreviewsComponent } from './components/allreviews/allreviews.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { LogoutComponent } from './components/logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainSectionComponent,
    HexagonsComponent,
    CheckmarksComponent,
    FooterComponent,
    RrethNeshComponent,
    RegisterComponent,
    LoginComponent,
    UserDashboardComponent,
    UserNavbarComponent,
    CarsComponent,
    UpdateProfileComponent,
    NewCarComponent,
    EditCarComponent,
    PostComponent,
    EditPostComponent,
    NewPostComponent,
    OrdersComponent,
    NewOrderComponent,
    EditOrderComponent,
    ReviewsComponent,
    EditReviewComponent,
    NewReviewComponent,
    WishlistComponent,
    PostDetailsComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    NewAdminComponent,
    CarChartComponent,
    AllusersComponent,
    AllcarsComponent,
    AllpostsComponent,
    AllordersComponent,
    AllreviewsComponent,
    AdminNavbarComponent,
    LogoutComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
