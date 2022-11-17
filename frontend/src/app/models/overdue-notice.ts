import { Assignment } from './assignment';
import { Warning } from './warning';

export interface OverdueNotice {
    uuid: string;
    assignments: Assignment[];
    warnings: Warning[];
}
