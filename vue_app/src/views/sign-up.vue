<template>
	<div>
		<v-form enctype="post" ref="form" v-model="valid" class="red lighten-4 ma-8 pa-9  font-weight-medium center" style="text-align:center" >

			Sign-up

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
			pseudo: '',
			mail: '',
			password: '',
			valid: true,
		}
	},
	methods: {
		signUp(){
			axios.post(process.env.VUE_APP_BACK_URL + '/user', {
				'pseudo': this.pseudo,
				'mail': this.mail,
				'password': this.password,
			})
			.then((response)=> {
				console.log(response.data);
			})
			.catch(function (error) {
				console.log(error);
			})
		},
		validate(){
			this.signUp();
		}
	},
	mounted: function() {
	}
}


</script>
