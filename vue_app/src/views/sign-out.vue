<template>
	<div>
		sign-out
	</div>
</template>


<script>

import axios from  'axios';
//import sorting from '@/components/sorting.vue'

export default {
	components: {
//		'my-sorting': sorting
	},
	data: function(){
		return {
		//	podcasts: null,
		}
	},
	methods: {
//		deletePodcast(id){
//			axios.delete(url, {data:{'id': id}})
//				.then((response)=> {
//					this.getPodcast();
//				})
//				.catch(function (error) {
//					console.log(error);
//				})
//		},
//		getPodcast(){
//			axios.get(process.env.VUE_APP_BACK_URL + '/podcast', { })
//				.then((response)=> {
//					this.podcasts = response.data;
//					this.podcasts = this.podcasts.map(function(el) {
//						var o = Object.assign({}, el);
//						o.show = false;
//						return o;
//					})
//					console.log(this.podcasts);
//					this.show = true;
//				})
//				.catch(function (error) {
//					console.log(error);
//				})
//		},
	},
	mounted: function() {
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


