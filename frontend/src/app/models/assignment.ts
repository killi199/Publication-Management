import { Borrower } from "./borrower";
import { Publication } from "./publication";

export interface Assignment{
    uuid?: string | null;
    dateOfAssignment?: Date | null;
    dateOfReturn?: Date | null;
    borrower?: Borrower | null;
    extensions?: number | null;
    publication?: Publication | null;
    latestReturnDate?: Date | null;
    publicationLoss?: boolean | null;
}