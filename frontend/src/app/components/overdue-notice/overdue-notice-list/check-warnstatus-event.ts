import { OverdueNotice } from 'src/app/models/overdue-notice';


export interface OverdueNoticeEvent {
    overdueNotice: OverdueNotice;
    warnable: boolean;
    deleteable: boolean;
}
