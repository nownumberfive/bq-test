<script setup lang="ts">
type Props = {
	label: string;
	errors: string[];
};

const props = defineProps<Props>();
</script>

<template>
	<label class="mb-10 flex-column-center">
		<span>{{ props.label }}</span>
		<slot />
		<span class="error" v-if="errors.length > 0">
			<span v-for="error in errors" :key="error">{{ error }}</span>
		</span>
	</label>
</template>
