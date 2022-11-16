import { Author } from './author';
import { Keyword } from './keyword';
import { KindOfPublication } from './kind-of-publication';

export class Publication {
    constructor(
        public key?: string | null,
        public title?: string | null,
        public authors?: Author[] | null,
        public dateOfPublication?: Date | null,
        public publisher?: string | null,
        public kindOfPublication?: KindOfPublication | null,
        public isbn?: string | null,
        public keywords?: Keyword[] | null,
        public quantity?: number | null
    ) {}
}
