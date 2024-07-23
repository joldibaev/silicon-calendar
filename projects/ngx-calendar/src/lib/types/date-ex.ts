export interface Presented {
  year: number;
  month: number;
}

export class DateEx extends Date {
  isEqual(date2: Date): boolean {
    return (
      this.getFullYear() === date2.getFullYear() &&
      this.getMonth() === date2.getMonth() &&
      this.getDate() === date2.getDate()
    );
  }

  isAfter(date2: DateEx): boolean {
    return this.getTime() > date2.getTime();
  }

  isBefore(date2: DateEx): boolean {
    return this.getTime() < date2.getTime();
  }

  toPresented() {
    return {
      year: this.getFullYear(),
      month: this.getMonth(),
    }
  }

  override toString() {
    const month = this.getMonth().toString().padStart(2, '0');
    const date = this.getDate().toString().padStart(2, '0');

    return `${this.getFullYear()}-${month}-${date}`;
  }
}
