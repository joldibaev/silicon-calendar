export interface NgxCalendarOptions {
  datePipeFormat: string;
  interactWithAnotherMonthsDates: boolean;
  showAnotherMonthsDates: {
    previousMonth: boolean;
    nextMonth: boolean;
  },
  showWeeks: boolean;
  startFromMonday: boolean;
  markToday: boolean;
}
