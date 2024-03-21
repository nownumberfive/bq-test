<script setup lang="ts">
import { ROUTE_NAME_LOGIN } from "@/constants/routes";
import { useRouter } from "vue-router";
import BaseForm from '@/components/Base/BaseForm.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { required, minLength } from '@vuelidate/validators'
import { useForm } from "@/composables/useForm";
import api from '@/api';

const router = useRouter();

const form = useForm({
	fields: {
		username: '',
		password: '',
	},
	rules: {
		username: {
			required,
			minLength: minLength(3),
		},
		password: {
			required,
			minLength: minLength(4),
		}
	},
	submitFn: api.auth.register,
	successToast: true,
	errorToast: true,
	onSuccess: async () => await router.replace({ name: ROUTE_NAME_LOGIN }),
});

</script>

<template>
	<div>
		<BaseForm class="authForm" title="Регистрация" @submit="form.onSubmit">
			<div class="flex-column-center">
				<div class="mb-10 flex-column-center">
					<label for="username">Логин</label>
					<InputText v-model="form.data.username" :invalid="form.errors.username.length > 0" />
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
					<Button type="submit" label="Зарегистрироваться" class="w-full mt-10" :loading="form.loading.value" />
				</div>
			</template>

			<template #footer>
				<div class="mt-10 fs-12">
					<span>Уже есть аккаунт? Нажмите, чтобы <router-link to="/login" class="link">войти</router-link>.</span>
				</div>
			</template>
		</BaseForm>
	</div>
</template>
