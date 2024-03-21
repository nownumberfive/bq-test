<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import PageHeader from "@/components/Page/PageHeader.vue"

const route = useRoute();

const showHeader = computed(() => {
	return route.path === '/';
})
</script>

<template>
	<div class="wrapper">
		<PageHeader v-if="showHeader" />
		<main id="main">
			<RouterView />
		</main>
	</div>
</template>
