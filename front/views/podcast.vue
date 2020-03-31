
<template>
	<div>
		<v-card
		v-if="show"
		v-for="podcast in podcasts"
		:key="podcast.id"
		class="ma-5 transparent"
outlined
		>

		<v-row tile no-gutters align="center">
				<v-col cols="2" class="transparent text-center" >
					<v-icon v-if="!podcast.show" @click="showPodcast(podcast)" size="60" color="green darken-2"> mdi-play-circle</v-icon></br>
			<a @click="deletePodcast(podcast.id)">delete</a></br>
					<a @click="updateupdate(podcast.id)">update</a>
				</v-col>

				<v-col cols="10" >
					<v-card color="rgb(230, 238, 156, 0.8)" class="px-10 rounded-card" style="border-radius:40px;">
					<span class="title">{{podcast.title}}</br></span>
					{{ getDate(podcast.date) }}  <span class="float-right">{{podcast.country}}</span></br>
					{{getDescription(podcast.description)}}</br>
					<v-card style="border-radius:0px;" class="mt-5 transparent" outlined>
					<audio v-if="podcast.show" controls style="width:100%">
						<source :src="buildSrc(podcast.pathName)" type="audio/mpeg">
						Your browser does not support the audio element.
					</audio>
					</v-card>
					</v-card>
				</v-col>
		</v-row>

		</v-card>
	</div>
</template>


<script charset="utf-8">


module.exports = {
	data: function(){
		return {
			podcasts: null,
			show: false,
		}
	},
	methods: {
		updatePodcast(id){
		},
		deletePodcast(id){
			console.log("*************");
			console.log(id);
			axios.delete('http://chardin-computing.freeboxos.fr:3000/podcast', {data:{'id': id}})
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
			axios.get('http://chardin-computing.freeboxos.fr:3000/podcast', { })
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
			return "http://chardin-computing.freeboxos.fr:3000/static/podcast/" + src;
		}
	},
	mounted: function() {
		this.getPodcast();
	}
}


</script>

<style>
.btn--plain {
  height: auto;
  width: auto;
  margin: 0;
  padding: 6px;
  min-width: 0;
  > .btn__content {
    padding: 0;
    opacity: 0.75;
    &:before {
      background-color: transparent !important;
      transition: none !important;
    }
  }
  &:hover {
    > .btn__content {
      opacity: 1;
    }
  }
}
</style>




