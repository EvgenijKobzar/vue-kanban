<template>
	<v-dialog
			v-model="show"
			width="800"
	>
		<v-card>

			<v-card-text >

				<template v-for="item in config" :key="item.title">
					<v-card-title >
						<span class="text-h5">{{item.title}}</span>
					</v-card-title>

					<v-checkbox
							label="Burkina Faso"
							value="burkina"
					></v-checkbox>
					<v-checkbox
							label="Burma"
							value="burma"
					></v-checkbox>
					<v-checkbox
							label="Burundi"
							value="burundi"
					></v-checkbox>
				</template>
			</v-card-text>


			<v-card-actions>
				<v-btn color="primary" block @click="show = false">Close Dialog</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
<script>
export default {
	props: {
		config: {
			type: Object
		},
	},
	data() {
		return {
				show: false,
				text: null,
		}
	}
}
</script>

<style scoped>

</style>