import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileappsharedComponent } from './mobileappshared.component';

describe('MobileappsharedComponent', () => {
  let component: MobileappsharedComponent;
  let fixture: ComponentFixture<MobileappsharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileappsharedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileappsharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
