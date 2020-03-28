<template>

	<v-form ref="form" v-model="valid" :lazy-validation="lazy" class="red lighten-4 ma-8 pa-9  font-weight-medium center" style="text-align:center" >

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
		:disabled="!valid"
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
			return value.length > 0 ? true : 'field required';
		},
		pathNameRules(value){
			return value.length > 0 ? true : 'field required';
		},
		dateRules(value){
			return value.length > 0 ? true : 'field required';
		},
		countryRules(value){
			return value.length > 0 ? true : 'field required';
		},
		fileChange($event){
			this.audioSrc = URL.createObjectURL(this.filePodcast);
			this.showPodcast = true;
		},
		postPodcast(){
			axios.post('http://chardin-computing.freeboxos.fr:3000/podcast', {
				title: this.title,
				pathName: this.pathName,
				date: this.date,
				country: this.country,
				description: this.description
			})
			.then((response)=> {
			})
			.catch(function (error) {
				console.log(error);
			})
		},
		validate(){
			if (this.$refs.form.validate()){
				this.postPodcast();
			}
		}
	},
	mounted: function() {
	}
}

</script>
