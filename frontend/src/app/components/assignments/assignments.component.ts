import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreComponent } from 'src/app/helpers/core-component';
import { Assignment } from 'src/app/models/assignment';
import { AssignmentService } from 'src/app/services/assignment.service';

@Component({
    selector: 'app-assignments',
    templateUrl: './assignments.component.html',
    styleUrls: ['../../helpers/core-component.scss'],
})
export class AssignmentsComponent extends CoreComponent<Assignment>{
    data: Observable<Assignment[]>;

    constructor(service: AssignmentService){
        super();
        this.data = service.loadAllAssignments();
    }
}
