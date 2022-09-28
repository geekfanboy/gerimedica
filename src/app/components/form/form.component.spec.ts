import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form.component';

import { RouterTestingModule } from '@angular/router/testing';
import { SuccessComponent } from '../success/success.component';
import * as data from '../../../assets/to-render.json';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([
          { path: 'success', component: SuccessComponent }
        ])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create correct number of fields', () => {
    const formElem = fixture.nativeElement.querySelector('#signupForm');
    const inputElems = formElem.querySelectorAll('input');
    let fields = (data as any).default;
    expect(inputElems.length).toEqual(fields.length);
  });

  it('should initialize form controls as empty', () => {
    const form = component.signupForm;
    let fields = (data as any).default;
    fields.forEach((x: { field: string | (string | number)[]; }) => {
      expect(form.get(x.field)?.value).toBe('');
    })
  })


  it('shoudl amrk form as invalid if required but empty', fakeAsync(() => {
    const form = component.signupForm;
    let fields = (data as any).default;
    // incomplete
    fields.forEach((x: any) => {
      if (x.mandatory) {
        form.get(x.field)?.setValue('');
        fixture.detectChanges();
        tick();
        expect(component.signupForm.valid).toBeFalsy();
      }
    })

  }))


});
