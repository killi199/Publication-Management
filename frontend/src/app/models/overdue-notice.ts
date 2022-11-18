import { Assignment } from './assignment';
import { Warning } from './warning';

export interface OverdueNotice {
    uuid: string;
    assignment: Assignment;
    warnings: Warning[];
}
