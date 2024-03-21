import type { Ref, UnwrapNestedRefs } from 'vue';
import { reactive, ref, unref } from 'vue';
import { useToast } from "vue-toastification";
import useVuelidate from '@vuelidate/core'

const toast = useToast();

type ValidationErrors<F> = {
	[Key in keyof F]: string[];
}

type FormOptions<F, R> = {
	fields: F,
	rules: R,
	submitFn: (data: F) => Promise<any> | any,
	successToast: boolean,
	successText?: string,
	errorToast: boolean,
	errorText?: string,
	onSuccess?: (data: F) => void;
	onError?: (data: F, error: Error) => void,
}

type FormResult<F> = {
	data: UnwrapNestedRefs<F>,
	errors: UnwrapNestedRefs<ValidationErrors<F>>,
	loading: Ref<boolean>,
	onSubmit: () => Promise<any>,
}

function createErrorObject<F extends Record<string, any>>(fields: F): ValidationErrors<F> {
	return Object.keys(fields).reduce((acc, key: keyof F) => {
		acc[key] = [];

		return acc
	}, {} as ValidationErrors<F>)
}

export const useForm = <F extends Record<string, any>, R extends Record<string, any>>(options: FormOptions<F, R>): FormResult<F> => {
	const loading = ref(false);
	const data = reactive(options.fields);
	const errors = reactive(createErrorObject<F>(options.fields));

	const v$ = useVuelidate(options.rules, data);

	const validate = async () => {
		const isValid = await v$.value.$validate();
		Object.keys(errors).forEach((key: string) => {
			if (v$.value[key]?.$errors.length > 0) {
				//@ts-ignore
				errors[key] = v$.value[key].$errors.map((err) => err.$message);
			} else {
				//@ts-ignore
				errors[key] = [];
			}
		})
		return isValid;
	}

	const onSubmit = async () => {
		try {
			const isFormValid = await validate();

			if (!isFormValid) return;

			loading.value = true;

			const res = await options.submitFn(options.fields);

			if (options.successToast) {
				toast.success(options.successText || res?.message);
			}

			if (options.onSuccess) {
				options.onSuccess(unref(data));
			}
		} catch(err: any) {

			if (options.errorToast) {
				toast.error(options.errorText || err?.message);
			}

			if (options.onError) {
				options.onError(unref(data), err as Error);
			}
		} finally {
			loading.value = false;
		}
	}

	return {
		data,
		errors,
		loading,
		onSubmit
	}
}
