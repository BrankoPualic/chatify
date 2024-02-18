import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const ScaleAnimation = trigger('scale-animation', [
  state('void', style({ transform: 'scale(0.5)' })),
  state('*', style({ transform: 'scale(1)' })),
  transition('void => *', animate('200ms ease-in')),
]);
