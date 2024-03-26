<script setup lang="ts">
import { ROUTE_NAME_INDEX } from "@/constants/routes";
import BaseForm from '@/components/Base/BaseForm.vue';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from "vue-router";
import { required } from '@vuelidate/validators'
import { useForm } from "@/composables/useForm";
import BaseInputWrapper from "@/components/Base/BaseInputWrapper.vue";

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
		<BaseForm class="authForm" title="Вход" submit-btn-text="Войти" :loading="form.loading.value" @submit="form.onSubmit">
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
					<span>Еще нет аккаунта? Нажмите, чтобы <router-link to="/register" class="link">зарегистрироваться</router-link>.</span>
				</div>
			</template>
		</BaseForm>
	</div>
</template>
