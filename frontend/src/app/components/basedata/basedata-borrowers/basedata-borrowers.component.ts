import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Borrower } from 'src/app/models/borrower';
import { TableInits } from '../../../helpers/table-inits';

@Component({
    selector: 'app-basedata-borrowers',
    templateUrl: './basedata-borrowers.component.html',
    styleUrls: ['./basedata-borrowers.component.scss'],
})
export class BasedataBorrowersComponent
    extends TableInits<Borrower>
    implements OnInit, AfterViewInit
{
    @Input() borrowers: Borrower[] = [];

    displayedColumns: string[] = ['surname', 'name', 'studentnumber'];

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.borrowers);
    }
}
