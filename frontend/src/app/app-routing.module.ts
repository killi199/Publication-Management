import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { DunningComponent } from './components/dunning/dunning.component';
import { PublicationsComponent } from './components/publications/publications.component';

const routes: Routes = [
    {path: 'publications', component: PublicationsComponent},
    {path: 'dunning', component: DunningComponent},
    {path: '', component: DunningComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
