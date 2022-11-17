import { Entity } from "./entity";

export interface Author extends Entity {
    surname?: string;
    name?: string;
}
