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
import EventBus from '@/components/eventBus.js';

export default {
	data: function(){
		return {
			pseudo: '',
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
				EventBus.$emit('EVENT_NAME', 'hello');
				this.$router.push({ name: 'podcast'})
			})
			.catch(function (error) {
				console.log(error);
			})
		}
	},
	mounted: function() {
		console.log("hello");
		console.log(this.password);
	}
}



</script>
