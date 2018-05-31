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

export function fadeInAnimation() {
  return trigger('fadeInAnimation', [
    transition(':enter', [
      style({opacity: 0}),
      animate('2s', style({opacity: 1}))
    ]),

    transition(':leave', [
      style({opacity: 1}),
      animate('.2s', style({opacity: 0}))
    ]),
  ]);
}
