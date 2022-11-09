import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from 'src/app/models/author';
import { TableInits } from '../../../helpers/table-inits';

@Component({
    selector: 'app-basedata-authors',
    templateUrl: './basedata-authors.component.html',
    styleUrls: ['./basedata-authors.component.scss'],
})
export class BasedataAuthorsComponent
    extends TableInits<Author>
    implements OnInit, AfterViewInit
{
    @Input() authors: Author[] = [];

    displayedColumns: string[] = ['surname', 'name'];

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.authors);
    }
}
