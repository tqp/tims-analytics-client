import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';

export const tqpCustomAnimations = [

  trigger('rotateIcon', [
    state('default', style({transform: 'rotate(0)'})),
    state('rotated', style({transform: 'rotate(-90deg'})),
    transition('rotated => default', animate('100ms ease-out')),
    transition('default => rotated', animate('100ms ease-in'))
  ]),
];


