import { NgModule } from '@angular/core';

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
import {MatTabsModule} from '@angular/material/tabs';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';
import { DunningComponent } from './components/dunning/dunning.component';
import { BasedataComponent } from './components/basedata/basedata.component';
import { BasedataKindsComponent } from './components/basedata/basedata-kinds/basedata-kinds.component';
import { BasedataKeywordsComponent } from './components/basedata/basedata-keywords/basedata-keywords.component';
import { BasedataBorrowersComponent } from './components/basedata/basedata-borrowers/basedata-borrowers.component';
import { BasedataAuthorsComponent } from './components/basedata/basedata-authors/basedata-authors.component';

@NgModule({
    declarations: [
        AppComponent,
        PublicationsComponent,
        PublicationListComponent,
        PublicationViewComponent,
        DunningComponent,
        BasedataComponent,
        BasedataKindsComponent,
        BasedataKeywordsComponent,
        BasedataBorrowersComponent,
        BasedataAuthorsComponent,
    ],
    imports: [
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
        HttpClientModule,
        MatTabsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
