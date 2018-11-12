import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[myAutofocus]'
})
export class AutofocusDirective implements OnChanges {
  @Input() shouldBeFocused: boolean;

  constructor(private elementRef: ElementRef) {
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.shouldBeFocused) {
      this.elementRef.nativeElement.focus();
    }
  }

}
