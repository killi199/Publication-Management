import {NgModule} from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';

@NgModule({
    declarations: [
        AppComponent,
        PublicationsComponent,
        PublicationListComponent,
        PublicationViewComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatTableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
