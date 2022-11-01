import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Publication } from 'src/app/models/publication';

@Component({
    selector: 'app-publication-view',
    templateUrl: './publication-view.component.html',
    styleUrls: ['./publication-view.component.scss'],
})
export class PublicationViewComponent implements OnInit {
    @ViewChild('form')
    form!: NgForm;

    @Input()
    publication: Publication = new Publication();

    @Output()
    deletePublication = new EventEmitter<Publication>();

    @Output()
    savePublication = new EventEmitter<Publication>();

    editable: boolean = false;

    savedPublication: Publication = new Publication();

    ngOnInit(): void {
        if(!this.publication){
            this.editable = true;
        }
        else{
            this.savedPublication = structuredClone(this.publication);
        }
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.publication);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.savePublication.emit(this.publication);
            this.editable = false;
        }
    }

    onCancel(): void {
        this.editable = false;
        this.publication = structuredClone(this.savedPublication);
    }

    onEdit(): void {
        this.editable = true;
    }
}
