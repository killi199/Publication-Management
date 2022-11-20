import { Borrower } from './borrower';
import { Entity } from './entity';

export interface Assignment extends Entity {
    dateOfAssignment: Date;
    dateOfReturn: Date;
    publicationKey: string;
    borrower: Borrower;
}
