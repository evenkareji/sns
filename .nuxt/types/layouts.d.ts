import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/IT222289/Desktop/TS_VUE/sns/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}