import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCalendarMonthComponent } from './ngx-calendar-month.component';

describe('NgxCalendarMonthComponent', () => {
  let component: NgxCalendarMonthComponent;
  let fixture: ComponentFixture<NgxCalendarMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCalendarMonthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxCalendarMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
