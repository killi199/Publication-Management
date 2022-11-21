// Author: Kevin Jahrens
import { Entity } from './entity';

export interface Warning extends Entity {
    overdueNoticeUuid: string;
    warningDate: Date;
}
