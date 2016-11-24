import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AgmCoreModule } from 'angular2-google-maps/core';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDfKLDQPQgpVU7wokCKnUgJVEB8vcwmd3g', libraries: ['places'],
      region: 'IN'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
