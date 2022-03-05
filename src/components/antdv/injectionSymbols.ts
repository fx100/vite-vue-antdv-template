import type { ComputedRef, InjectionKey } from 'vue'
import type { breakpointName } from './types'

export const breakpointMatchListKey: InjectionKey<
  ComputedRef<breakpointName[]>
> = Symbol()
