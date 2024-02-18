import { HammerGestureConfig } from '@angular/platform-browser';
import * as hammer from 'hammerjs';
import { Injectable } from '@angular/core';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override = {
    swipe: { direction: hammer.DIRECTION_HORIZONTAL },
    pinch: { enable: false },
    rotate: { enable: false },
  };
}
