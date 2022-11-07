import { Author } from './author';
import { Keyword } from './keyword';
import { KindOfPublication } from './kind-of-publication';

export class Publication {
    constructor(
        public key?: string,
        public titel?: string,
        public author?: Author[],
        public dateOfPublication?: Date,
        public publisher?: string,
        public kindsOfPublication?: KindOfPublication[],
        public isbn?: string,
        public keywords?: Keyword[],
        public quantity?: number
    ) {}

    equals(other: Publication | undefined): boolean {
        if(!other){
            return false;
        }
        
        return this.key === other.key;
    }
}
