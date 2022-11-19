import { Borrower } from "./borrower";
import { Publication } from "./publication";

export interface Assignment{
    uuid?: string | null;
    dateOfAssignment?: Date | null;
    dateOfReturn?: Date | null;
    publication?: Publication | null;
    borrower?: Borrower | null;
}