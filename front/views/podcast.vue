
<template>
	<div>
		<v-card
		v-for="podcast in podcasts"
		:key="podcast.id"
		class="ma-5 transparent"
		>

		<v-row no-gutters align="center">
				<v-col cols="2" class="transparent text-center" >
<v-icon large color="green darken-2">mdi-play-circle</v-icon>
				</v-col>

				<v-col cols="10" >
					{{podcast.title}}</br>
					{{podcast.date}} - {{podcast.country}}</br>
					{{podcast.description}}</br>
				</v-col>
		</v-row>




   
			<!-- <audio controls > -->
			<!-- <source :src="buildSrc(src)" type="audio/mpeg"> -->
			<!-- Your browser does not support the audio element. -->
			<!-- </audio> -->

		</v-card>
	</div>
</template>


<script charset="utf-8">


module.exports = {
	data: function(){
		return {
			podcasts: null,
		}
	},
	methods: {
		getPodcast(){
			axios.get('http://chardin-computing.freeboxos.fr:3000/podcast', {
			})
				.then((response)=> {
					this.podcasts = response.data;
					console.log(this.podcasts);
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
