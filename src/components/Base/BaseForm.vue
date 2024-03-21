<script setup lang="ts">
import Card from 'primevue/card';

type Props = {
  title?: string;
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
				<slot name="actions" />
			</form>
		</template>
		<template #footer>
			<slot name="footer" />
		</template>
	</Card>
</template>
