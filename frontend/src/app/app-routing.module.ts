import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { BasedataComponent } from './components/basedata/basedata.component';
import { DunningComponent } from './components/dunning/dunning.component';
import { PublicationsComponent } from './components/publications/publications.component';

const routes: Routes = [
    { path: 'publications', component: PublicationsComponent },
    { path: 'dunning', component: DunningComponent },
    { path: 'basedata', component: BasedataComponent },
    { path: 'assignments', component: AssignmentsComponent },
    { path: '', component: DunningComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
