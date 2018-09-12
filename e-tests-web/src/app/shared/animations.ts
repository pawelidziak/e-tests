import {animate, group, query, stagger, state, style, transition, trigger} from '@angular/animations';


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
    transition('* <=> *', [
      query(':enter', style({ opacity: 0 }), {optional: true}),
      query(':enter',
        stagger(100, [
          style({ transform: 'translateY(15%)', opacity: 0 }),
          animate('0.5s ease-in-out',
            style({ transform: 'translateY(0%)', opacity: 1 })
          )
        ]), { optional: true }
      )
    ])
  ]);
}

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({opacity: 0, position: 'fixed', width: '100%'})
      , {optional: true}),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({transform: 'translateY(-3%)', opacity: 0}),
        animate('0.5s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
      ], {optional: true}),
      query(':leave', [
        style({transform: 'translateY(0%)', opacity: 1}),
        animate('0.2s ease-in-out', style({transform: 'translateY(-3%)', opacity: 0})),
      ], {optional: true}),
    ])
  ])
]);
