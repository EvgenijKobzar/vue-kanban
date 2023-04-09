<template>
	<v-chip
					class="my-2" size="default"
					:color="item.background"
					text-color="white"
					variant="elevated"
					label
	>
		<v-icon start icon="mdi-label"/>
		{{item.title}}
	</v-chip>
</template>

<script setup>
defineProps([
	'item',
]);

</script>

<style scoped>

</style>