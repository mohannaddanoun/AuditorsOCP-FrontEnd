
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ManagerComponent } from './app/manager/manager.component';
import { ManagerFormComponent } from './app/manager-form/manager-form.component';
import { LoginComponent } from './app/login/login.component';
import { CustomerComponent } from './app/customer/customer.component';
import { provideToastr } from 'ngx-toastr';
import { RegisterComponent } from './app/register/register.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: 'app-register', pathMatch: 'full' },
      { path: 'app-register', component: RegisterComponent },
      { path: 'app-login', component: LoginComponent },
      { path: 'app-manager', component: ManagerComponent },
      { path: 'app-manager-form', component: ManagerFormComponent },
      { path: 'app-customer', component: CustomerComponent },

    ]),
    provideHttpClient(),
    provideAnimations(),    
    provideToastr(),   
  ],
}).catch(err => console.error(err));

