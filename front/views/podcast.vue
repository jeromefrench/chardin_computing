
<template>
	<div>

  <div class="text-right">
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          Sorting
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="item.method()"
        >
          <v-list-item-title >{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>



		<v-card
		v-if="show"
		v-for="podcast in podcasts"
		:key="podcast.id"
		class="my-5 transparent"
		outlined
		>



		<v-row tile no-gutters align="center">
				<v-col cols="2" class="transparent text-center" >
					<v-icon v-if="!podcast.show" @click="showPodcast(podcast)" class="mx-auto" size="60" color="green darken-2"> mdi-play-circle</v-icon></br>
			<a @click="deletePodcast(podcast.id)">delete</a></br>
					<a @click="updatePodcast(podcast.id)">update</a>
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
			items: [
				{ title: 'oldest', method: this.oldest },
				{ title: 'newest', method: this.newest },
			],
		}
	},
	methods: {
		oldest(){
			console.log(this.podcasts);
			console.log("oldest");
			this.podcasts = this.podcasts.sort(function(a,b){
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				return  new Date(a.date) -  new Date(b.date) ;
			});
			console.log(this.podcasts);
		},
		newest(){
			console.log(this.podcasts);
			console.log("newest");
			this.podcasts = this.podcasts.sort(function(a,b){
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				return new Date(b.date) - new Date(a.date);
			});
			console.log(this.podcasts);
		},
		updatePodcast(id){
			window.location.href = 'http://chardin-computing.freeboxos.fr/update-podcast/' + id;
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




