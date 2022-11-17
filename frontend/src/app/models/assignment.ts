import { Borrower } from "./borrower";

export interface Assignment{
    uuid?: string;
    dateOfAssignment?: Date;
    dateOfReturn?: Date;
    publicationKey?: string;
    borrower?: Borrower;
}