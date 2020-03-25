<template>
	<v-card
	outlined
	tile
	>
	ici

		<v-text-field
		v-model="pathName"
		label="Path name"
		></v-text-field>


		<v-menu
		v-model="menu2"
		:close-on-content-click="false"
		:nudge-right="40"
		transition="scale-transition"
		offset-y
		min-width="290px"
		>

			<template v-slot:activator="{ on }">
				<v-text-field
				v-model="date"
				label="Picker without buttons"
				readonly
				v-on="on"
				></v-text-field>
			</template>
			<v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>

		</v-menu>



		<v-text-field
		v-model="country"
		label="Country"
		></v-text-field>

		<v-btn
		color="success"
		@click="validate"
		>
		Validate
		</v-btn>

	</v-card>
</template>

<script charset="utf-8">

module.exports = {
	data: function() {
			return {
				pathName: null,
				date: new Date().toISOString().substr(0, 10),
				country: null,
				menu: false,
				modal: false,
				menu2: false,
			}
	},
	methods: {
		postPodcast(){
			axios.post('http://chardin-computing.freeboxos.fr:3000/podcast', {
				pathName: this.pathName,
				date: this.date,
				country: this.country
			})
			.then((response)=> {
			})
			.catch(function (error) {
				console.log(error);
			})
		},
		validate(){
			this.postPodcast();
		}
	},
	mounted: function() {
		//this.getPodcast();
	}
}

</script>
