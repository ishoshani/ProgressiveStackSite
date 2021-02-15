import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackViewComponent } from './stack-view.component';

describe('StackViewComponent', () => {
  let component: StackViewComponent;
  let fixture: ComponentFixture<StackViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
