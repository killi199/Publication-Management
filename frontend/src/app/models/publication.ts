import { Author } from "./author";
import { Keyword } from "./keyword";
import { KindOfPublication } from "./kind-of-publication";

export interface Publication {
    key: string;
    title: string;
    authors: Author[];
    dateOfPublication: Date;
    publisher: string;
    kindOfPublication: KindOfPublication;
    isbn: string;
    keywords: Keyword[];
    quantity: number;
}
