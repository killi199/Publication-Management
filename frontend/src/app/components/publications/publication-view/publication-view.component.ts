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
    publication: Publication | undefined;

    @Output()
    deletePublication = new EventEmitter<Publication>();

    @Output()
    savePublication = new EventEmitter<Publication>();

    @Output()
    cancel = new EventEmitter<void>();

    editable: boolean = false;

    ngOnInit(): void {
        if(!this.publication){
            this.editable = true;
        }
    }

    onDeletePublication(): void {
        this.deletePublication.emit(this.publication);
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.savePublication.emit(this.publication);
        }
    }

    onCancel(): void {
        this.editable = false;
        this.cancel.emit();
    }

    onEdit(): void {
        this.editable = true;
    }
}
