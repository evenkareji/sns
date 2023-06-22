import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/IT222289/Desktop/TS_VUE/sns/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}