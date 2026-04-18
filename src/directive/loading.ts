import { createApp } from 'vue'
import Loading from '@/components/Loading.vue'

const append = (el: any) => {
  if (!el.parentNode.classList.contains('loading-relative')) {
    el.parentNode.classList.add('loading-relative')
  }
  el.appendChild(el.instance.$el)
}

const remove = (el: any) => {
  if (el.parentNode.classList.contains('loading-relative')) {
    el.parentNode.classList.remove('loading-relative');
  }
  el.removeChild(el.instance.$el);
};

export default {
  mounted(el: any, binding: any) {
    const app = createApp(Loading, {
      loading: binding.value,
    });
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;
    if (binding.value) {
      append(el);
    }
  },
  updated(el: any, binding: any) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  },
};
