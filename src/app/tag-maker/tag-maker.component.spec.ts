import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagMakerComponent } from './tag-maker.component';

describe('TagMakerComponent', () => {
  let component: TagMakerComponent;
  let fixture: ComponentFixture<TagMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagMakerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
