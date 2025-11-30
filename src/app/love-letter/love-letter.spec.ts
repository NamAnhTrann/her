import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveLetter } from './love-letter';

describe('LoveLetter', () => {
  let component: LoveLetter;
  let fixture: ComponentFixture<LoveLetter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoveLetter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoveLetter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
