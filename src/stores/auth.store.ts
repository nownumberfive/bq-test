import type { RouteLocationNormalized } from 'vue-router';
import type { IUser, LoginParams } from '@/types/auth';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import { ROUTE_NAME_INDEX, ROUTE_NAME_LOGIN } from '@/constants/routes';
import { STORAGE_AUTH_KEY } from '@/constants/app';
import api from '@/api';

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const user = ref<IUser | null>(null);
  const accessToken = ref('');
  const redirectTo = ref('');

  async function login(params: LoginParams) {
    const { token } = await api.auth.login(params);

    setToken(token);
    await updateUser();
    await restoreRedirectUrl();
    saveSession();

    return true;
  }

  async function logout(withRedirect = true) {
    if (withRedirect) {
      await redirectToLogin().catch((error) => {
        console.error(error);
      });
    }

    removeUser();
    setToken();
    saveSession();
  }

  function setToken(token = '') {
    accessToken.value = token;
  }

  function removeUser() {
    user.value = null;
  }

  async function updateUser() {
    user.value = await api.auth.about() || null;
  }

  async function redirectToLogin() {
    await router.replace({ name: ROUTE_NAME_LOGIN });
  }

  async function restoreRedirectUrl() {
    const homePage = { name: ROUTE_NAME_INDEX };

    await router.replace(redirectTo.value || homePage);
    setRedirectTo('');
  }

  function setRedirectTo(path: string) {
    redirectTo.value = path;
  }

  function saveSession() {
    localStorage.setItem(STORAGE_AUTH_KEY, accessToken.value);
  }

  async function restoreSession() {
    accessToken.value = localStorage.getItem(STORAGE_AUTH_KEY) || '';

    if (accessToken.value) {
      await updateUser().catch((res) => {
        console.error(res);
        logout(true);
      });
    }
  }

  function authGuard(to: RouteLocationNormalized) {
    const isAuthNeeded = to.meta.authorizationRequired && !accessToken.value;
    const isLoginPage = to.name === ROUTE_NAME_LOGIN;

    if (isAuthNeeded) {
      setRedirectTo(to.fullPath);

      return false;
    } else if (isLoginPage) {
      logout(false);
    }

    return true;
  }

  return {
    user,
    accessToken,
    login,
    logout,
    restoreSession,
    authGuard,
    setToken,
    updateUser,
  };
});
