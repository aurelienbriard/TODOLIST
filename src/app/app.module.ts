import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyA2kyXbjBeXDYB7sgFjQ9-9IbQVC1qHPpE",
  authDomain: "todolist-d6792.firebaseapp.com",
  databaseURL: "https://todolist-d6792.firebaseio.com",
  projectId: "todolist-d6792",
  storageBucket: "todolist-d6792.appspot.com",
  messagingSenderId: "57265143282",
  appId: "1:57265143282:web:a49c033eae6b1340c43f6b",
  measurementId: "G-PX9LLZ2R0W"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireDatabaseModule,
     AngularFireAuthModule,
     AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
