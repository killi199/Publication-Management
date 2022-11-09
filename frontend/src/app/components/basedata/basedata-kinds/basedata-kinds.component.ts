import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { KindOfPublication } from 'src/app/models/kind-of-publication';
import { TableInits } from '../table-inits';

@Component({
    selector: 'app-basedata-kinds',
    templateUrl: './basedata-kinds.component.html',
    styleUrls: ['./basedata-kinds.component.scss'],
})
export class BasedataKindsComponent
    extends TableInits<KindOfPublication>
    implements OnInit
{
    @Input() kindOfPublications: KindOfPublication[] = [];
    @Output() deleteKindOfPub = new EventEmitter<KindOfPublication>();

    displayedColumns: string[] = ['kindOfPublication'];

    editMode = false;
    selectedKindOfPub: KindOfPublication | undefined;
  
    ngOnInit() {
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }

    selectionChanged(kindOfPublication: KindOfPublication) {
        this.selectedKindOfPub = kindOfPublication;
    }

    edit() {
        this.editMode = true;
    }

    save() {
        this.editMode = false;
    }

    undo() {
        this.editMode = false;
    }

    delete() {
        this.deleteKindOfPub.emit(this.selectedKindOfPub);
        this.dataSource = new MatTableDataSource(this.kindOfPublications);
    }
}
