import type { UseFetchOptions, AsyncData } from 'nuxt/app'

declare module '#app' {
  interface NuxtApp {
    $useCustomFetch: <T = any>(
      url: string,
      options?: UseFetchOptions<T>
    ) => AsyncData<T, any>
  }
}

export {}
