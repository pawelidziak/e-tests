import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';


export function sliderAnimation() {
  return trigger(
    'slider',
    [
      state('stay',
        style({transform: 'translateX(0)', opacity: 1})
      ),
      state('moveFromRight',
        style({transform: 'translateX(15%)', opacity: 0, position: 'fixed'})
      ),
      state('moveToLeft',
        style({transform: 'translateX(-15%)', opacity: 0, position: 'fixed'})
      ),
      transition('moveFromRight => stay', animate('.3s ease-in-out')),
      transition('stay => moveToLeft', animate('.3s ease-in-out')),
    ]
  );
}

export function fadeInAnimation() {
  return trigger('fadeInAnimation', [
    transition(':enter', [
      style({opacity: 0}),
      animate('.3s', style({opacity: 1}))
    ]),

    transition(':leave', [
      style({opacity: 1}),
      animate('.3s', style({opacity: 0}))
    ]),
  ]);
}

export function listAnimation() {
  return trigger('listStagger', [
    transition('* => *', [
      query(':enter', style({opacity: 0}), {optional: true}),
      query(':enter',
        stagger(100, [
          style({transform: 'translateY(15%)', opacity: 0}),
          animate('0.5s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
        ]), {optional: true}
      )
    ]),

  ]);
}


export function slideFromRightAnimation() {
  return trigger('slideFromRight', [
    transition(':enter', [
      style({transform: 'translateX(3%)', opacity: 0}),
      animate('.25s ease-in', style({transform: 'translateX(0%)', opacity: 1}))]),

  ]);
}

export function slideFromBottomAnimation() {
  return trigger('slideFromBottom', [
    transition(':enter', [
      style({transform: 'translateY(15%)', opacity: 0}),
      animate('.25s ease-in', style({transform: 'translateY(0%)', opacity: 1}))]),
  ]);
}

export function slideFromTopAnimation() {
  return trigger('slideFromTop', [
    transition(':enter', [
      style({transform: 'translateY(-15%)', opacity: 0}),
      animate('.25s ease-in', style({transform: 'translateY(0%)', opacity: 1}))]),
    transition(':leave', [
      style({transform: 'translateY(0%)', opacity: 1}),
      animate('.25s ease-out', style({transform: 'translateY(-15%)', opacity: 0}))]),
  ]);
}

export function slideFromTopAnimation2() {
  return trigger('slideFromTop', [
    transition('* => *', [ // each time the binding value changes
      query(':leave', [
        stagger(100, [
          style({transform: 'translateY(0%)', opacity: 1}),
          animate('0.5s ease-out', style({transform: 'translateY(-15%)', opacity: 0}))])
      ], {optional: true}),
      query(':enter', [
        style({opacity: 0}),
        stagger(100, [
          style({transform: 'translateY(-15%)', opacity: 0}),
          animate('0.5s ease-in', style({transform: 'translateY(0%)', opacity: 1}))])
      ], {optional: true})
    ])
  ]);
}

export const routeAnimations = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter > *', style({opacity: 0, position: 'fixed', width: '100%'}), {optional: true}),
    query(':leave > *', [
        style({transform: 'translateY(0%)', opacity: 1}),
        animate('0.2s ease-in-out', style({transform: 'translateY(-3%)', opacity: 0})),
        style({position: 'fixed'})
      ], {optional: true}
    ),
    query(':enter > *', [
        style({transform: 'translateY(-3%)', opacity: 0, position: 'static', width: '100%'}),
        animate('0.5s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
      ], {optional: true}
    )
  ]),
]);
