<template>
	<div>
		profile

		<v-text-field
		class="px-5"
		v-model="pseudo"
		label="Pseudo"
		></v-text-field>

		<v-text-field
		class="px-5"
		v-model="mail"
		label="Mail"
		></v-text-field>

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
			pseudo: '',
			mail: '',
		}
	},
	methods: {
		getProfile(){
			axios.get(process.env.VUE_APP_BACK_URL + '/user', { })
				.then((response)=> {
					console.log(response.data);
				})
				.catch(function (error) {
					console.log(error);
				})
		},
	},
	mounted: function() {
		this.getProfile();
	}
}

</script>
