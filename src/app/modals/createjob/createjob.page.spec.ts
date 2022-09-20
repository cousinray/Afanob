import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreatejobPage } from './createjob.page';

describe('CreatejobPage', () => {
  let component: CreatejobPage;
  let fixture: ComponentFixture<CreatejobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatejobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatejobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
