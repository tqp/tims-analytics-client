import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';

export const authenticationAnimations = [

  trigger('hideCredentialsButton', [
    state('visible', style({visibility: 'visible', opacity: 1, height: AUTO_STYLE})),
    state('hidden', style({visibility: 'hidden', opacity: 0, height: '0px'})),
    transition('visible => hidden', [
      animate('100ms 0ms', style({visibility: 'hidden', opacity: 0})),
      animate('200ms 0ms', style({height: '0px'}))
    ]),
    transition('hidden => visible', [
      animate('200ms 100ms', style({height: AUTO_STYLE})),
      animate('100ms 0ms', style({visibility: 'visible', opacity: 1}))
    ])
  ]),

  trigger('displayLogonForm', [
    state('visible', style({visibility: 'visible', opacity: 1, height: AUTO_STYLE})),
    state('hidden', style({visibility: 'hidden', opacity: 0, height: '0px'})),
    transition('visible => hidden', [
      animate('100ms 0ms', style({visibility: 'hidden', opacity: 0})),
      animate('200ms 0ms', style({height: '0px'}))
    ]),
    transition('hidden => visible', [
      animate('200ms 100ms', style({height: AUTO_STYLE})),
      animate('100ms 0ms', style({visibility: 'visible', opacity: 1}))
    ])
  ]),

  trigger('rotateIcon', [
    state('default', style({transform: 'rotate(0)'})),
    state('rotated', style({transform: 'rotate(-90deg'})),
    transition('rotated => default', animate('100ms ease-out')),
    transition('default => rotated', animate('100ms ease-in'))
  ]),
];


