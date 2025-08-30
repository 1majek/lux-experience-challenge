/// <reference types="vite/client" />

import type { DehydratedState } from '@tanstack/react-query';
import type { RootState } from './store';

declare global {
  interface Window {
    __PRELOADED_STATE__?: RootState;
    __DEHYDRATED_STATE__?: DehydratedState;
  }
}
