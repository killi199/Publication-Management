import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'frontend';
    showMiniNav: boolean = false;

    changeSidenav(){
        this.showMiniNav = !this.showMiniNav;
    }
}
