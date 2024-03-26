<script setup lang="ts">
import Card from 'primevue/card';
import Button from "primevue/button";

type Props = {
  title?: string;
	submitBtnText?: string;
	loading?: boolean;
};

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

async function onSubmit(event: any) {
	emit('submit', event);
}
</script>

<template>
	<Card class="--form">
		<template #title>
			{{ props.title }}
		</template>
		<template #content>
			<form @submit.prevent="onSubmit">
				<slot />
				<div class="mt-10">
					<slot name="actions">
						<Button type="submit" :label="props.submitBtnText || 'Отправить'" class="w-full" :loading="props.loading" />
					</slot>
				</div>
			</form>
		</template>
		<template #footer>
			<slot name="footer" />
		</template>
	</Card>
</template>
