<template>
	<div>
		<my-sorting class="float-right":podcasts=this.podcasts v-on:orderPodcast="sortPodcast($event)"></my-sorting>
		</br>
		</br>
		<div
		v-if="show"
		v-for="podcast in podcasts"
		:key="podcast.id"
		class="cardColor" flat
		>
			<v-row>
				<v-col cols="2">
					<div class="my-boite" >
					<v-icon v-if="!podcast.show" @click="showPodcast(podcast)" size="60" color="green darken-2"> mdi-play-circle</v-icon></br>
					<v-icon @click="deletePodcast(podcast.id)">delete</v-icon></br>
					<v-icon @click="updatePodcast(podcast.id)">update</v-icon>
					</div>
				</v-col>
				<v-col cols="10">
					<v-card color="rgb(230, 238, 156, 0.8)" >
					<v-card-title>{{podcast.title}}</v-card-title>
					<v-card-subtitle class="pb-0">{{ getDate(podcast.date) }}<span class="my-span">{{podcast.country}}</span></v-card-subtitle>
					<v-card-text class="text--primary">{{getDescription(podcast.description)}}</v-card-text>
							<audio  controls  v-if="podcast.show" style="width:100%; padding: 10p x" >
								<source :src="buildSrc(podcast.pathName)" type="audio/mpeg">
								Your browser does not support the audio element.
							</audio>
					</v-card>
				</v-col>
			</v-row>
		</div>
	</div>
</template>


<script>

import axios from  'axios';
import moment from  'moment';
import sorting from '@/components/sorting.vue'

export default {
	components: {
		'my-sorting': sorting
	},
	data: function(){
		return {
			podcasts: null,
			show: false,
		}
	},
	methods: {
		updatePodcast(id){
			this.$router.push({ name: 'update-podcast', params: { id: id } })
		},
		deletePodcast(id){
			console.log("*************");
			console.log(id);
			let url = process.env.VUE_APP_BACK_URL + '/podcast';
			console.log(url);
			axios.delete(url, {data:{'id': id}})
				.then((response)=> {
					this.getPodcast();
				})
				.catch(function (error) {
					console.log(error);
				})
		},
		showPodcast(podcast){
			podcast.show = true;
			console.log("play pod");
		},
		getDate(laDate){
			return moment(laDate).format("MMMM Do YYYY");
		},
		getDescription(description){
			return description == '' ? 'no description' : description;
		},
		getPodcast(){
			this.show = false;
			console.log("ici");
			console.log(process.env.VUE_APP_BACK_URL + '/podcast');
			axios.get(process.env.VUE_APP_BACK_URL + '/podcast', { })
				.then((response)=> {
					this.podcasts = response.data;
					this.podcasts = this.podcasts.map(function(el) {
						var o = Object.assign({}, el);
						o.show = false;
						return o;
					})
					console.log(this.podcasts);
					this.show = true;
				})
				.catch(function (error) {
					console.log(error);
				})
		},
		buildSrc(src){
			return process.env.VUE_APP_BACK_URL + "/static/podcasts/" + src;
		},
		sortPodcast(podcast){
			console.log(podcast);
		}
	},
	mounted: function() {
		console.log(process.env.NODE_ENV)
		console.log(process.env)
		this.getPodcast();
	}
}


</script>


<style>
.cardColor {
   	background-color: rgba(255, 255, 255, 0) !important;
   	border-color: rgba(255, 255, 255, 0) !important;
}

.my-span {
  	float: right;
}
.my-boite{
	text-align: center;
}
.sorting{
  float: right;
}


</style>
