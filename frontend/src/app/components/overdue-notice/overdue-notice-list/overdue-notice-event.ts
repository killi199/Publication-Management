import { OverdueNotice } from "src/app/models/overdue-notice";

export interface OverdueNoticeEvent {
    overdueNotice: OverdueNotice;
    deleteable: boolean;
}