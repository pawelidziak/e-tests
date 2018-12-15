import {
  animate,
  animateChild,
  query,
  sequence,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

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

const TRANSFORM_FROM_LEFT = [
  style({transform: 'translateX(-3%)', opacity: 0}),
  animate('.25s ease-in-out', style({transform: 'translateX(0%)', opacity: 1}))
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

export const TRANSFORM_FROM_TOP = [
  style({transform: 'translateY(-3%)', opacity: 0}),
  animate('0.5s ease-in-out', style({transform: 'translateY(0%)', opacity: 1}))
];

const SCALE_ONE = [
  style({opacity: 0, transform: 'scale(0)'}),
  animate('.35s ease-in-out', style({opacity: 1, transform: 'scale(1)'}))
];

const SCALE_ZERO = [
  style({opacity: 1, transform: 'scale(1)'}),
  animate('.35s ease-in-out', style({opacity: 0, transform: 'scale(0)'}))
];

/*
      ROUTE ANIMATIONS
 */
export function routeAnimations() {
  return trigger('routeAnimations', [
    transition('* => *', [
      query(':enter > *', style({opacity: 0, position: 'fixed'}), {optional: true}),
      sequence([
        query(':leave', animateChild(), {optional: true}),
        query(':leave > *', [
            style({opacity: 1}),
            animate('0.25s ease-in-out',
              style({opacity: 0})
            ),
            style({position: 'fixed'})
          ], {optional: true}
        ),
        query(':enter > *', [
            style({opacity: 0, position: 'static'}),
            animate('0.25s ease-in-out',
              style({opacity: 1})
            )
          ], {optional: true}
        ),
        query(':enter', animateChild(), {optional: true}),
      ]),
    ]),
  ])
    ;
}

/*
      LIST ANIMATIONS
 */
export function listAnimation() {
  return trigger('listStagger', [
    transition('* => *', [
      query(':enter', style({opacity: 0}), {optional: true}),
      query(':enter',
        stagger(100, TRANSFORM_FROM_TOP), {optional: true}
      )
    ]),
  ]);
}

/*
      EXPANDED PANEL ANIMATIONS
 */

export function expandPanelAnimation() {
  return trigger('expand', [
    state('collapsed, void', style({height: '0px', minHeight: '0', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms ease-in-out')),
    transition('expanded <=> void', animate('225ms ease-in-out'))
  ]);
}

/*
      SLIDE ANIMATIONS
 */
export function slideFromBottom() {
  return trigger('slideFromBottom', [
    transition(':enter', TRANSFORM_FROM_BOTTOM)
  ]);
}

export function slideFromTop() {
  return trigger('slideFromTop', [
    transition(':enter', TRANSFORM_FROM_TOP)
  ]);
}

export function slideFromTopToTop() {
  return trigger('slideFromTopToTop', [
    transition(':enter', TRANSFORM_FROM_TOP),
    transition(':leave', TRANSFORM_TO_TOP)
  ]);
}

export function slideFromRight() {
  return trigger('slideFromRight', [
    transition(':enter', TRANSFORM_FROM_RIGHT)
  ]);
}

export function slideFromLeft() {
  return trigger('slideFromLeft', [
    transition(':enter', TRANSFORM_FROM_LEFT)
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
