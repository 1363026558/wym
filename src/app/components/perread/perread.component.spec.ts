import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerreadComponent } from './perread.component';

describe('PerreadComponent', () => {
  let component: PerreadComponent;
  let fixture: ComponentFixture<PerreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
