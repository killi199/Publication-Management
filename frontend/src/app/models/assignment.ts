import { Borrower } from "./borrower";

export interface Assignment{
    uuid?: string | null;
    dateOfAssignment?: Date | null;
    dateOfReturn?: Date | null;
    publicationKey?: string | null;
    borrower?: Borrower | null;
}