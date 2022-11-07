import { Author } from "./author";
import { Keyword } from "./keyword";
import { KindOfPublication } from "./kind-of-publication";

export interface Publication {
    key: string;
    titel: string;
    author: Author[];
    dateOfPublication: Date;
    publisher: string;
    kindsOfPublication: KindOfPublication[];
    isbn: string;
    keywords: Keyword[];
    quantity: number;
}
