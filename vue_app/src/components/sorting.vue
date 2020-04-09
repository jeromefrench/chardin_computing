<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ on: menu }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="primary"
              dark
              v-on="{ ...tooltip, ...menu }"
            >Sort</v-btn>
          </template>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="item.method"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>


<script>

export default {
	props: {
		podcasts: { type: Array },
	},
	data: function(){
		return {
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
			this.$emit('orderPodcast', this.podcasts);
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
			this.$emit('orderPodcast', this.podcasts);
		},

	}
}

</script>
