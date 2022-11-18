import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../models/assignment';
import { Borrower } from '../models/borrower';

@Injectable({
    providedIn: 'root',
})
export class AssignmentService {
    assignments: Assignment[];
    counter: number = 0;

    constructor() {
        this.assignments = this.generateAllAssignments();
        this.counter = 0;
    }

    update(assignment: Assignment): Observable<Assignment> {
        // TODO does not work :(
        const index = this.assignments
            .map((a) => a.uuid)
            .indexOf(assignment.uuid);
        if (index !== -1) {
            this.assignments.splice(index, 1);
            this.assignments.splice(index, 0, assignment);
            return of(assignment);
        }

        return of(assignment);
    }

    create(assignment: Assignment): Observable<Assignment> {
        // TODO does not work :(
        if(assignment.dateOfAssignment) {
            const newDate = new Date(assignment.dateOfAssignment);
            assignment.dateOfReturn = new Date(newDate.setFullYear(newDate.getFullYear() + 1));
            this.assignments.push(assignment);
        }
        return of(assignment);
    }

    loadAllAssignments(): Observable<Assignment[]> {
        return of(this.assignments);
    }

    loadAssignments(uuid: string): Observable<Assignment[]> {
        return of(this.assignments.filter((a) => a.publicationKey === uuid));
    }

    extendAssignment(assignment: Assignment): Observable<Assignment> {
        // TODO does not work :(
        if (!assignment.dateOfReturn) return of(assignment);
        const newDate = new Date(assignment.dateOfReturn);
        newDate.setFullYear(newDate.getFullYear() + 1);
        assignment.dateOfReturn = newDate;
        this.counter = this.counter + 1;
        return of(assignment);
    }

    isAssignmentExtendable(assignment: Assignment): Observable<boolean> {
        // TODO does not work :(
        return of(this.counter < 3 ? true : false);
    }

    private generateAllAssignments(): Assignment[] {
        const borrowers: Borrower[] = [
            {
                name: 'Max',
                surname: 'Schmidth',
                studentNumber: '4444',
                uuid: '1',
            },
            { name: 'Tom', surname: 'Hmidt', studentNumber: '1444', uuid: '2' },
            {
                name: 'Fabi',
                surname: 'Chmidt',
                studentNumber: '544',
                uuid: '3',
            },
        ];
        const assignments: Assignment[] = [
            {
                uuid: '12333',
                borrower: borrowers[0],
                dateOfAssignment: new Date(2022, 10, 23),
                dateOfReturn: new Date(2023, 1, 1),
                publicationKey: '111',
            },
            {
                uuid: '12323',
                borrower: borrowers[1],
                dateOfAssignment: new Date(2022, 5, 3),
                dateOfReturn: new Date(2022, 10, 12),
                publicationKey: '333',
            },
            {
                uuid: '42333',
                borrower: borrowers[2],
                dateOfAssignment: new Date(2022, 11, 13),
                dateOfReturn: new Date(2023, 1, 14),
                publicationKey: '221',
            },
            {
                uuid: '12345',
                borrower: borrowers[0],
                dateOfAssignment: new Date(2022, 10, 23),
                dateOfReturn: new Date(2023, 1, 1),
                publicationKey: 'c6b91843-a823-45f2-b125-6c89bdba061f',
            }
        ];
        return assignments;
    }
}
