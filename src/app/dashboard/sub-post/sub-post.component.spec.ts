import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubPostComponent } from './sub-post.component';

describe('SubPostComponent', () => {
  let component: SubPostComponent;
  let fixture: ComponentFixture<SubPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
