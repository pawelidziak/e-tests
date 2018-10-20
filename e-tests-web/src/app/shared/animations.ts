import {animate, animateChild, query as q, sequence, style, transition, trigger} from '@angular/animations';

const query = (s, a, o = {optional: true}) => q(s, a, o);

/*
      ROUTE ANIMATIONS
 */
export const routeAnimations = trigger('routeAnimations', [
  transition('* => *', [
    query(':enter > *', style({opacity: 0, position: 'fixed'})),
    sequence([
      query(':leave', animateChild()),
      query(':leave > *', [
          style({transform: 'translateY(0%)', opacity: 1}),
          animate('0.25s ease-in-out',
            style({transform: 'translateY(-3%)', opacity: 0})
          ),
          style({position: 'fixed'})
        ]
      ),
      query(':enter > *', [
          style({transform: 'translateY(-3%)', opacity: 0, position: 'static'}),
          animate('0.25s ease-in-out',
            style({transform: 'translateY(0%)', opacity: 1})
          )
        ]
      ),
      query(':enter', animateChild()),
    ]),
  ]),
]);

/*
      SLIDE ANIMATIONS
 */
export function slideFromBottom() {
  return trigger('slideFromBottom', [
    transition(':enter', TRANSFORM_FROM_BOTTOM)
  ]);
}

export function slideFromRight() {
  return trigger('slideFromRight', [
    transition(':enter', TRANSFORM_FROM_RIGHT)
  ]);
}

export function slideFromRightToRight() {
  return trigger('slideFromRightToRight', [
    transition(':enter', TRANSFORM_FROM_RIGHT),
    transition(':leave', TRANSFORM_TO_RIGHT)
  ]);
}

export function slideFromRightToLeft() {
  return trigger('slideFromRightToLeft', [
    transition(':enter', TRANSFORM_FROM_RIGHT),
    transition(':leave', TRANSFORM_TO_LEFT)
  ]);
}

export function slideFromBottomToTop() {
  return trigger('slideFromBottomToTop', [
    transition(':enter', TRANSFORM_FROM_BOTTOM),
    transition(':leave', TRANSFORM_TO_TOP),
  ]);
}

export function scaleOneZero() {
  return trigger('scaleOneZero', [
    transition(':enter', SCALE_ONE),
    transition(':leave', SCALE_ZERO),
  ]);
}

/*
      STEPS
 */

const TRANSFORM_FROM_RIGHT = [
  style({transform: 'translateX(3%)', opacity: 0}),
  animate('.25s ease-in-out', style({transform: 'translateX(0%)', opacity: 1}))
];

const TRANSFORM_TO_RIGHT = [
  style({transform: 'translateX(0%)', opacity: 1}),
  animate('.25s ease-in-out', style({transform: 'translateX(3%)', opacity: 0}))
];

const TRANSFORM_TO_LEFT = [
  style({transform: 'translateY(0%)', opacity: 1}),
  animate('.25s ease-in-out', style({transform: 'translateY(-3%)', opacity: 0}))
];

const TRANSFORM_FROM_BOTTOM = [
  style({transform: 'translateY(3%)', opacity: 0}),
  animate('.25s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
];

const TRANSFORM_TO_TOP = [
  style({transform: 'translateY(0%)', opacity: 1}),
  animate('.25s ease-in-out', style({transform: 'translateY(-3%)', opacity: 0}))
];

const SCALE_ONE = [
  style({opacity: 0, transform: 'scale(0)'}),
  animate('.35s ease-in-out', style({opacity: 1, transform: 'scale(1)'}))
];

const SCALE_ZERO = [
  style({opacity: 1, transform: 'scale(1)'}),
  animate('.35s ease-in-out', style({opacity: 0, transform: 'scale(0)'}))
];
