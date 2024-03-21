<script setup lang="ts">
import Card from 'primevue/card';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();
</script>

<template>
	<Card class="infoCard">
		<template #title>
			<div>Имя: {{ auth.user?.username || '-' }} (id: {{ auth.user?.id || '-' }})</div>
		</template>
		<template #content>
			<div class="text-center">О себе:</div>
			<div>{{ auth.user?.about || 'Тут ничего нет ¯\\\_(ツ)_/¯' }}</div>
		</template>
	</Card>
</template>
