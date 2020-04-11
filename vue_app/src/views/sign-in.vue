<template>
	<div>
		<v-form enctype="post" ref="form" v-model="valid" class="red lighten-4 ma-8 pa-9  font-weight-medium center" style="text-align:center" >

		Sign-in

		<v-text-field
		class="px-5"
		v-model="mail"
		label="Mail"
		></v-text-field>

		<v-text-field
		class="px-5"
		v-model="password"
		label="Password"
		required
		></v-text-field>

		<v-btn
		:disabled="!valid"
		color="success"
		@click="validate"
		>
		Validate
		</v-btn>


		</v-form>

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
			mail: '',
			password: '',
			valid: true,
		}
	},
	methods: {
		validate(){
			this.signIn();
		},
		signIn(){
			axios.post(process.env.VUE_APP_BACK_URL + '/user/sign-in', {
				'mail': this.mail,
				'password': this.password,

			})
			.then((response)=> {
			})
			.catch(function (error) {
				console.log(error);
			})
		}
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

