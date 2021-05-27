import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingsPageComponent } from './rentings-page.component';

describe('RentingsPageComponent', () => {
  let component: RentingsPageComponent;
  let fixture: ComponentFixture<RentingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentingsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
