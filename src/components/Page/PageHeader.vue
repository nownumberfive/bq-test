<script setup lang="ts">
import Button from 'primevue/button';
import { useAuthStore } from '@/stores/auth.store';

const auth = useAuthStore();

const onClick = async () => {
	await auth.logout();
}
</script>

<template>
 <header id="header">
	 <Button class="mr-10" label="Выйти" @click="onClick" />
 </header>
</template>
