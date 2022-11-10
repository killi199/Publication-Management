import { TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { TestUtils } from './helpers/test-util';

describe('AppComponent', () => {
    beforeEach(async () => {
        TestUtils.utilTest();
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                MatSidenavModule,
                MatPaginatorModule,
                BrowserAnimationsModule,
                MatListModule,
            ],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'frontend'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('frontend');
    });
});
