import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Keyword } from 'src/app/models/keyword';
import { TableInits } from '../table-inits';

@Component({
    selector: 'app-basedata-keywords',
    templateUrl: './basedata-keywords.component.html',
    styleUrls: ['./basedata-keywords.component.scss'],
})
export class BasedataKeywordsComponent
    extends TableInits<Keyword>
    implements OnInit, AfterViewInit
{
    @Input() keywords: Keyword[] = [];

    displayedColumns: string[] = ['keyword'];

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.keywords);
    }
}
