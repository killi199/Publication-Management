import { LOCALE_ID, NgModule } from '@angular/core';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from "@angular/material/autocomplete";

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';
import { DunningComponent } from './components/dunning/dunning.component';
import { registerLocaleData } from '@angular/common';

import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
    declarations: [
        AppComponent,
        PublicationsComponent,
        PublicationListComponent,
        PublicationViewComponent,
        DunningComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTableModule,
        MatIconModule,
        MatSortModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatSelectModule,
        MatAutocompleteModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'de-DE' },
        { provide: LOCALE_ID, useValue: 'de-DE' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
