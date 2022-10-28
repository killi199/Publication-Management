import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';

@NgModule({
    declarations: [
        AppComponent,
        PublicationsComponent,
        PublicationListComponent,
        PublicationViewComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatGridListModule,
        MatCardModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
