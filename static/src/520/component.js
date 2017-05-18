import upload from './upload.vue'
import remind from './remind.vue'

const components = {}

components.install = (Vue) => {
  Vue.component('upload', upload)
  Vue.component('remind', remind)
}

export default components
