export interface NgxCalendarOptions {
  datePipeFormat: string;
  allowClickDisableDate: boolean;
  startFromMonday: boolean;
  showAnotherMonths: {
    previousMonth: boolean;
    nextMonth: boolean;
  };
  checkToday: boolean;
}
