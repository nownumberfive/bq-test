import type { App } from 'vue';
import type { PluginOptions } from 'vue-toastification';
import Toast, { POSITION } from 'vue-toastification';

import "vue-toastification/dist/index.css";

const options: PluginOptions = {
  shareAppContext: true,
  position: POSITION.BOTTOM_LEFT,
  timeout: 4000,
};

export default {
  install(app: App) {
    app.use(Toast, options);
  },
};
