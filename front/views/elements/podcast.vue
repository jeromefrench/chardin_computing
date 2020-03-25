
<template>
	<div>

<v-card
v-for="src in podcastSrc" 
:key="src"
outlined
tile
>
{{src}}
</br>

	<audio controls >
		<source :src="buildSrc(src)" type="audio/mpeg">
		Your browser does not support the audio element.
	</audio>

</v-card>

	</div>
</template>


<script charset="utf-8">


module.exports = {
//var app = new Vue({
	//vuetify: new Vuetify(),
	data: function() {
		return {
			podcastSrc: null,
			showPodcast: false,
		}
	},
	methods: {
		getPodcast(){
			axios.get('http://chardin-computing.freeboxos.fr:3000/podcast', {
			})
			.then((response)=> {
				this.podcastSrc = response.data;
				console.log(this.podcastSrc);
				console.log(this.showPodcast);
				this.showPodcast = true;
				console.log(this.showPodcast);
				console.log("hello");
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
//})
}


</script>
