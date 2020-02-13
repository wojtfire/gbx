import { Component, Input, ViewChild, ElementRef, forwardRef, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
    selector: 'input-text',
    template: `
        <div class="form-control" [class.focused]="focused" [class.dirty]="dirty" (click)="focus()">
            <label><ng-content></ng-content></label>
            <div class="input-wrapper">
              <input #input [formControl]="formControl" type="text" (click)="onInputFocus()" (blur)="onInputBlur($event, false)" (keyup.enter)="onInputBlur($event, true)">
              <svg (click)="onClick($event)" class="icon" width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.7899 8.66887C16.1804 8.27834 16.1804 7.64518 15.7899 7.25465L9.42591 0.890694C9.03539 0.500169 8.40222 0.500169 8.0117 0.890694C7.62118 1.28122 7.62118 1.91438 8.0117 2.30491L13.6686 7.96176L8.0117 13.6186C7.62118 14.0091 7.62118 14.6423 8.0117 15.0328C8.40222 15.4234 9.03539 15.4234 9.42591 15.0328L15.7899 8.66887ZM0.120361 8.96176H15.0828V6.96176H0.120361V8.96176Z" fill="#F1F4FF"/>
              </svg>
            </div>
        </div>
    `,
    styleUrls: ['./input-text.scss'],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputTextComponent),
        multi: true
      }
    ]
  })
  export class InputTextComponent implements ControlValueAccessor {
    @ViewChild('input', { static: false }) input: ElementRef;
    @Input() placeholder: string;
    @Input() disabled: boolean;
    @Output() clicked = new EventEmitter();
    @Output() enter = new EventEmitter();
    formControl = new FormControl();
    focused: boolean;
    dirty: boolean;

    public get isFocused(): boolean {
      return this.focused;
    }

    onChange: any = (value: string) => {
      this.formControl.setValue(value);
    }
    onTouch: any = () => {}

    onClick(event) {
      event.preventDefault();
      event.stopPropagation();
      this.clicked.emit(null);
    }

    focus() {
      this.input.nativeElement.focus();
      this.focused = true;
    }

    onInputBlur(event, enter: boolean) {
      const value = event.target.value;
      this.dirty = value ? true : false;
      this.focused = false;
      this.onChange(value);
      enter && this.enter.emit(null);
    }

    onInputFocus() {
      this.focused = true;
    }

    writeValue(value: string) {
      this.formControl.setValue(value);
    }

    registerOnChange(fn: (value: string) => void) {
      this.onChange = fn;
    }

    registerOnTouched(fn: any) {
      this.onTouch = fn;
    }

    setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
    }
  }
