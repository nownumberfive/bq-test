<script setup lang="ts">
import { ROUTE_NAME_LOGIN } from "@/constants/routes";
import { useRouter } from "vue-router";
import BaseForm from '@/components/Base/BaseForm.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { required, minLength } from '@vuelidate/validators'
import { useForm } from "@/composables/useForm";
import api from '@/api';
import BaseInputWrapper from "@/components/Base/BaseInputWrapper.vue";

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
		<BaseForm class="authForm" title="Регистрация" submit-btn-text="Зарегистрироваться" :loading="form.loading.value" @submit="form.onSubmit">
			<div class="flex-column-center">
				<BaseInputWrapper label="Логин" :errors="form.errors.username">
					<InputText v-model="form.data.username" type="text" :invalid="form.errors.username.length > 0" />
				</BaseInputWrapper>

				<BaseInputWrapper label="Пароль" :errors="form.errors.password">
					<Password v-model="form.data.password" toggleMask :invalid="form.errors.password.length > 0" />
				</BaseInputWrapper>
			</div>

			<template #footer>
				<div class="mt-10 fs-12">
					<span>Уже есть аккаунт? Нажмите, чтобы <router-link to="/login" class="link">войти</router-link>.</span>
				</div>
			</template>
		</BaseForm>
	</div>
</template>
