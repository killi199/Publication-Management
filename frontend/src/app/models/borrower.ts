// Author: Kevin Jahrens
import { Entity } from './entity';

export interface Borrower extends Entity {
    surname: string;
    name: string;
    studentNumber: string;
}
