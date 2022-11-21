// Author: Marcel Dymarz
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { BasedataComponent } from './components/basedata/basedata.component';
import { OverdueNoticeComponent } from './components/overdue-notice/overdue-notice.component';
import { PublicationsComponent } from './components/publications/publications.component';

const routes: Routes = [
    { path: 'publications', component: PublicationsComponent },
    { path: 'basedata', component: BasedataComponent },
    { path: 'assignments', component: AssignmentsComponent },
    { path: 'overdue-notice', component: OverdueNoticeComponent },
    { path: '', component: OverdueNoticeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
