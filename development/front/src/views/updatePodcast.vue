<template>

	<v-form enctype="multipart/form-data" ref="form" v-model="valid" :lazy-validation="lazy" class="red lighten-4 ma-8 pa-9  font-weight-medium center" style="text-align:center" >

		<v-card class="ma-2  pa-2 red lighten-5  ">
			<audio controls  v-if="showPodcast"  class="ma-auto" style="width: 100%">
				<source :src="audioSrc" type="audio/mpeg">
				Your browser does not support the audio element.
			</audio>
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

<script>

import axios from  'axios';

export default {
	data: function() {
			return {
				showPodcast: false,
				datePick: false,
				audioSrc: null,
				title: '',
				pathName: '',
				date: new Date().toISOString().substr(0, 10),
				country: '',
				description: '',
				valid: false,
				lazy: false,
				id: null,
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
		updatePodcast(){
			data = {
				'title': this.title,
				'pathName': this.pathName,
				'date': this.date,
				'country': this.country,
				'description': this.description
			}
			axios.put('http://chardin-computing.freeboxos.fr:3000/podcast/' + this.id, data)
			.then((response)=> {
				console.log(response.data);
				this.getPodcast();
			})
			.catch(function (error) {
				console.log(error);
			})
		},
		getPodcast(){
			console.log("&*&*&*");
			console.log(this.id);
			this.show = false;
			axios.get('http://chardin-computing.freeboxos.fr:3000/podcast/' + this.id, { })
				.then((response)=> {
					console.log(response.data);
					let podcast = response.data;
					this.title = podcast.title;
					this.description = podcast.description;
					this.data = podcast.date;
					this.pathName = podcast.pathName;
					this.country = podcast.country;
					this.audioSrc = this.buildSrc(podcast.pathName);
					this.showPodcast = true;
				})
				.catch(function (error) {
					console.log(error);
				})
		},
		validate(){
			if (this.$refs.form.validate()){
				this.updatePodcast();
			}
		},
		buildSrc(src){
			return "http://chardin-computing.freeboxos.fr:3000/static/podcast/" + src;
		}
	},
	mounted: function() {
		let localUrl = window.location.href;
		console.log(localUrl);
		let regex = /([^\/])*$/;
		let str = localUrl;
		let newstr = str.match(regex);
		console.log(newstr)
		console.log(newstr);
		this.id = newstr[0];
		this.getPodcast();
	}
}

</script>


<style>
.custom{
	border: 2px solid red;
	padding: 30px;
}
</style>


