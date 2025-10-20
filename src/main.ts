import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule } from '@angular/common/http'; 
import 'zone.js'
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      BrowserAnimationsModule, 
      ToastrModule.forRoot({
        positionClass: 'toast-top-center',  
        timeOut: 1000,                 
        progressBar: true,                 
        closeButton: true,                 
        newestOnTop: true,                
        preventDuplicates: true
      }),
      HttpClientModule        
    )
  ]
});
