import {animate, state, style, transition, trigger} from '@angular/animations';


export function sliderAnimation() {
  return trigger(
    'slider',
    [
      state('stay',
        style({transform: 'translateX(0)', opacity: 1})
      ),
      state('moveFromRight',
        style({transform: 'translateX(100%)', opacity: 0})
      ),
      state('moveToLeft',
        style({transform: 'translateX(-100%)', opacity: 0})
      ),
      transition('moveFromRight => stay', animate('200ms ease-in-out')),
      transition('stay => moveToLeft', animate('200ms ease-in-out')),
    ]
  );
}
