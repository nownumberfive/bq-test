import type { RouteLocationNormalized, Router } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { ROUTE_NAME_LOGIN } from '@/constants/routes';
import { DEFAULT_TITLE } from '@/constants/app';

const currentRoute = ref<RouteLocationNormalized | null>(null);

export function enableRouterGuards(router: Router) {
  router.beforeEach(async (to) => {
    currentRoute.value = to;
    const authStore = useAuthStore();

    if (!authStore.authGuard(to)) {
      return { name: ROUTE_NAME_LOGIN, replace: true };
    }

    return true;
  });

  watchEffect(() => {
    const title = currentRoute.value?.meta.title;

    document.title = String(title) || DEFAULT_TITLE;
  })
}
