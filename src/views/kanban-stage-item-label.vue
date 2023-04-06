<template>
	<v-chip class="w-100" :style="{background: item.background}" text-color="white" label>
		<v-icon start icon="mdi-label"/>
		{{item.title}}
	</v-chip>
</template>

<script setup>
const props = defineProps([
	'item',
]);
</script>

<style scoped>

</style>