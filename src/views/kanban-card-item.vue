<template>
	<div class="bg-white shadow rounded px-3 pt-3 pb-5 border border-white" >
		<div class="d-flex justify-between">
			<p class="text-gray-700 font-semibold font-sans tracking-wide text-sm">{{item.title}}</p>
			<v-avatar size="24" image="//pc31.megaplan.ru/hosts/auroralogistic.megaplan.ru/100x100/attach/SdfFileM_File/File/25/afe47c503483e11bae50305bddaa448d.png"/>
		</div>
		<div class="d-flex mt-3 justify-between text-sm" v-html="item.subject"></div>
		<div class="d-flex mt-3 justify-between items-center">
			<v-chip
					class="ma-2"  size="small"
					color="primary"
					variant="elevated"
			>
				{{item.date}}

			</v-chip>
			<!--      <span class="text-sm text-gray-600">{{item.date}}</span>-->

			<v-chip
					class="ma-2" size="small"
					color="red"
					text-color="white"
			>
				<!--				{{item.type}}-->
				Р406КВ 39
			</v-chip>
		</div>
	</div>
</template>

<script setup>
	const props = defineProps([
		'item',
	]);

</script>

<style scoped>

</style>