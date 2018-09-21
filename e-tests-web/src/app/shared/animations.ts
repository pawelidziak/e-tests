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
    transition('* <=> *', [
      query(':enter', style({opacity: 0}), {optional: true}),
      query(':enter',
        stagger(100, [
          style({transform: 'translateY(15%)', opacity: 0}),
          animate('.3s ease-in-out',
            style({transform: 'translateY(0%)', opacity: 1})
          )
        ]), {optional: true}
      )
    ])
  ]);
}


export function slideFromRightAnimation() {
  return trigger('slideFromRight', [
    transition(':enter', [
      style({transform: 'translateX(30%)', opacity: 0}),
      animate('.25s ease-in',
        style({transform: 'translateX(0%)', opacity: 1})
      )]),

  ]);
}
export function slideFromBottomAnimation() {
  return trigger('slideFromBottom', [
    transition(':enter', [
      style({transform: 'translateY(30%)', opacity: 0}),
      animate('.25s ease-in',
        style({transform: 'translateY(0%)', opacity: 1})
      )]),
  ]);
}

export const routerTransition = trigger('routerTransition', [
  transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({
        opacity: 0,
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%'
      })
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
