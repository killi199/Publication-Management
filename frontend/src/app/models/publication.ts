// Author: Kevin Jahrens
import { Author } from './author';
import { Entity } from './entity';
import { Keyword } from './keyword';
import { KindOfPublication } from './kind-of-publication';

export interface Publication extends Entity {
    key?: string | null;
    title?: string | null;
    authors?: Author[] | null;
    dateOfPublication?: Date | null;
    publisher?: string | null;
    kindOfPublication?: KindOfPublication | null;
    isbn?: string | null;
    keywords?: Keyword[] | null;
    quantity?: number | null;
    deleted?: boolean | null;
}
