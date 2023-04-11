<template>
		<div class="d-flex pt-3 justify-start">

			<v-avatar v-if="item.avatar"
								size="24"
								:image="item.avatar"
			/>
			<v-avatar v-else
								size="24"
								:color="item.color">
				<span class="text-caption">{{item.short}}</span>
			</v-avatar>
		</div>
</template>

<script setup>

defineProps([
	'item',
]);

</script>
