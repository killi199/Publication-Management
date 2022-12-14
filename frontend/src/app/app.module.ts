import { LOCALE_ID, NgModule } from '@angular/core';

// Material Modules
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';
import { BasedataComponent } from './components/basedata/basedata.component';
import { BasedataKindsComponent } from './components/basedata/basedata-kinds/basedata-kinds.component';
import { BasedataKeywordsComponent } from './components/basedata/basedata-keywords/basedata-keywords.component';
import { BasedataBorrowersComponent } from './components/basedata/basedata-borrowers/basedata-borrowers.component';
import { BasedataAuthorsComponent } from './components/basedata/basedata-authors/basedata-authors.component';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { GermanDateAdapter } from './helpers/german-date-adapter';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { AssignmentListComponent } from './components/assignments/assignment-list/assignment-list.component';
import { AssignmentViewComponent } from './components/assignments/assignment-view/assignment-view.component';
import { OverdueNoticeComponent } from './components/overdue-notice/overdue-notice.component';
import { OverdueNoticeListComponent } from './components/overdue-notice/overdue-notice-list/overdue-notice-list.component';
import { getGermanPaginatorIntl } from './helpers/german-paginator-intl';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
    declarations: [
        AppComponent,
        PublicationsComponent,
        PublicationListComponent,
        PublicationViewComponent,
        BasedataComponent,
        BasedataKindsComponent,
        BasedataKeywordsComponent,
        BasedataBorrowersComponent,
        BasedataAuthorsComponent,
        AssignmentsComponent,
        AssignmentListComponent,
        AssignmentViewComponent,
        OverdueNoticeComponent,
        OverdueNoticeListComponent,
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
        MatCheckboxModule,
        FormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTabsModule,
        MatSnackBarModule,
        MatSlideToggleModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'de-DE' },
        { provide: DateAdapter, useClass: GermanDateAdapter },
        { provide: MatPaginatorIntl, useValue: getGermanPaginatorIntl() },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(dateAdapter: DateAdapter<Date>) {
        dateAdapter.setLocale('de-DE');
    }
}
