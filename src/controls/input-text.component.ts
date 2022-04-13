import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ex-input-text',
  templateUrl: 'input-text.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputTextComponent,
    },
  ],
})
export class InputTextComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder: string = '';

  @Output() inputFocus: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() inputBlur: EventEmitter<Event> = new EventEmitter<Event>();

  @ViewChild('input')
  inputElement: ElementRef;

  onChange: (value: any) => void;
  onTouched: () => void;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    console.log(this.type, 'init', this.inputElement);
  }

  ngAfterViewInit() {
    console.log(this.type, 'afterViewInit', this.inputElement);
  }

  writeValue(value: string): void {
    console.log(this.type, 'writeValue', value);
    if (this.inputElement) {
      this.inputElement.nativeElement.value = value;
    }
  }

  registerOnChange(fn: any): void {
    console.log(this.type, 'registerOnChange');
    this.onChange = (value: string) => {
      console.log(this.type, 'onChange', value);
      return fn(value);
    };
  }

  registerOnTouched(fn: any): void {
    console.log(this.type, 'registerOnTouched');
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    console.log(this.type, 'setDisabledState', isDisabled);
    if (isDisabled) {
      this.inputElement.nativeElement.setAttribute('disabled', 'true');
    } else {
      this.inputElement.nativeElement.removeAttribute('disabled');
    }
    this.changeDetector.markForCheck();
  }

  onInputFocus(event: Event) {
    console.log(this.type, 'onInputFocus');
    this.inputFocus.emit(event);
  }

  onInputBlur(event: Event) {
    console.log(this.type, 'onInputBlur');
    this.inputBlur.emit(event);
    this.onTouched();
  }

  handleInput({ target }) {
    console.log(this.type, 'handleInput', target.value);
    this.onChange(target.value);
  }
}
