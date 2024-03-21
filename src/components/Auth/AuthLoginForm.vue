<script setup lang="ts">
import {ROUTE_NAME_INDEX} from "@/constants/routes";
import BaseForm from '@/components/Base/BaseForm.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from "primevue/button";
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from "vue-router";
import {required} from '@vuelidate/validators'
import {useForm} from "@/composables/useForm";

const auth = useAuthStore();
const router = useRouter();

const form = useForm({
	fields: {
		username: '',
		password: '',
	},
	rules: {
		username: {
			required,
		},
		password: {
			required,
		}
	},
	submitFn: auth.login,
	successToast: false,
	errorToast: true,
	onSuccess: async () => await router.replace({ name: ROUTE_NAME_INDEX }),
});

</script>

<template>
	<div>
		<BaseForm class="authForm" title="Вход" @submit="form.onSubmit">
			<div class="flex-column-center">
				<div class="mb-10 flex-column-center">
					<label for="username">Логин</label>
					<InputText v-model="form.data.username" type="text" :invalid="form.errors.username.length > 0" />
					<div class="error" v-if="form.errors.username.length > 0">
						<p v-for="error in form.errors.username" :key="error">{{ error }}</p>
					</div>
				</div>
				<div class="mb-10 flex-column-center">
					<label for="password">Пароль</label>
					<Password v-model="form.data.password" toggleMask :invalid="form.errors.password.length > 0" />
					<div class="error" v-if="form.errors.password.length > 0">
						<p v-for="error in form.errors.password" :key="error">{{ error }}</p>
					</div>
				</div>
			</div>

			<template #actions>
				<div>
					<Button type="submit" label="Войти" class="w-full mt-10" :loading="form.loading.value" />
				</div>
			</template>

			<template #footer>
				<div class="mt-10 fs-12">
					<span>Еще нет аккаунта? Нажмите, чтобы <router-link to="/register" class="link">зарегистрироваться</router-link>.</span>
				</div>
			</template>
		</BaseForm>
	</div>
</template>
