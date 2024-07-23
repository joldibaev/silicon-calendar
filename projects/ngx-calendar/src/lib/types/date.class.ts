export class DateEx extends Date {
  isEqual(date2: DateEx): boolean {
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

  override toString() {
    const month = this.getMonth().toString().padStart(2, '0');
    const date = this.getDate().toString().padStart(2, '0');

    return `${this.getFullYear()}-${month}-${date}`;
  }
}
