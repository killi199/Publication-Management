// Author: Kevin Jahrens
import { Assignment } from './assignment';
import { Entity } from './entity';
import { Warning } from './warning';

export interface OverdueNotice extends Entity {
    assignment?: Assignment;
    warnings?: Warning[];
    overdueNoticeState?: string;
}
