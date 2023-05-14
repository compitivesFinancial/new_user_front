import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SukukPositComponent } from './sukuk-posit.component';

describe('SukukPositComponent', () => {
  let component: SukukPositComponent;
  let fixture: ComponentFixture<SukukPositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SukukPositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SukukPositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
