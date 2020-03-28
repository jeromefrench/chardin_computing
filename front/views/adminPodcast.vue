<template>

	<v-form v-model="valid" :lazy-validation="lazy" class="red lighten-4 ma-8 pa-9  font-weight-medium center" style="text-align:center" >

		<v-card class="ma-2  pa-2 red lighten-5  ">
			<audio controls  v-if="showPodcast"  class="ma-auto" style="width: 100%">
				<source :src="audioSrc" type="audio/mpeg">
				Your browser does not support the audio element.
			</audio>
			<v-file-input class="px-5"  v-model="filePodcast" @change="fileChange($event)" label="File input"></v-file-input>
		</v-card>

		<v-card class="ma-2   red lighten-5">
			<v-text-field
			class="px-5"
			v-model="title"
			:rules="[ titleRules ]"
			label="Title"
			></v-text-field>
		</v-card>

		<v-card class="ma-2   red lighten-5">
			<v-text-field
			class="px-5"
			light
			v-model="pathName"
			:rules="[ pathNameRules ]"
			label="Path name"
			></v-text-field>
		</v-card>

		<v-card class="ma-2 pa-2  red lighten-5">
			<v-menu
			v-model="datePick"
			:close-on-content-click="false"
			:nudge-right="40"
			:rules="[ dateRules ]"
			transition="scale-transition"
			offset-y
			min-width="290px"
			>

				<template v-slot:activator="{ on }">
					<v-text-field
					class="px-5"
					v-model="date"
					label="Date"
					readonly
					v-on="on"
					></v-text-field>
				</template>
				<v-date-picker v-model="date" @input="datePick = false"></v-date-picker>

			</v-menu>
		</v-card>

		<v-card class="ma-2   red lighten-5">
			<v-text-field
			class="px-5"
			v-model="country"
			label="Country"
			:rules="[ countryRules ]"
			></v-text-field>
		</v-card>

		<v-card class="ma-2   red lighten-5">
			<v-textarea
			class="ma-2"
			name="description"
			label="Description"
			v-model="description"
			></v-textarea>
		</v-card>

		<v-btn
		color="success"
		@click="validate"
		>
		Validate
		</v-btn>

	</v-form>

</template>

<script charset="utf-8">

module.exports = {
	data: function() {
			return {
				showPodcast: false,
				datePick: false,
				filePodcast: null,
				audioSrc: null,
				title: '',
				pathName: '',
				date: new Date().toISOString().substr(0, 10),
				country: '',
				description: '',
				valid: false,
				lazy: false,
			}
	},
	methods: {
		titleRules(value){
			return value.length == 0 ? 'field required': true;
		},
		pathNameRules(value){
			return value.length == 0 ? 'field required': true;
		},
		dateRules(value){
			return value.length == 0 ? 'field required': true;
		},
		countryRules(value){
			return value.length == 0 ? 'field required': true;
		},
		fileChange($event){
			this.audioSrc = URL.createObjectURL(this.filePodcast);
			this.showPodcast = true;
		},
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
        //this.$vuetify.theme.themes.light.primary = '#E53935';
		//console.log(this.$vuetify.theme.themes.light.primary);
        //this.$vuetify.theme.themes.light.secondary = '#FFCDD2';
        //this.$vuetify.theme.themes.light.accent =  '#3F51B5';
        //this.$vuetify.theme.themes.light.background =  '#FFAB91';
	}
}

</script>
