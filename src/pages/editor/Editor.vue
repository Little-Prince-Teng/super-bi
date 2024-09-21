<template>
	<div class="layout">
		<Container v-bind="props" />
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import Container from './Container.vue';

const props = defineProps()
</script>