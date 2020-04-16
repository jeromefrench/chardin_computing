<template>
	<div v-if="connected">
			<v-btn @click="$router.push({ name: 'profile'})">Profile</v-btn></br>
			<v-btn @click="signOut()"  >Sign-out</v-btn></br>
	</div>
	<div v-else>
		<v-btn @click="$router.push({ name: 'sign-in'})"   >Sign-in</v-btn></br>
		<v-btn @click="$router.push({ name: 'sign-up'})" >Register</v-btn>
	</div>
</template>

<script>


import axios from  'axios';
import EventBus from '@/components/eventBus.js';


axios.defaults.withCredentials = true;

export default {
	data: function(){
		return {
			connected: false,
		}
	},
	methods: {
		amIConnected(){
			axios.defaults.withCredentials = true;
			axios.get(process.env.VUE_APP_BACK_URL + '/connected')
				.then((response)=> {
					console.log(response.data);
					if(response.data == true){
						this.connected = true;
					}
					else{
						this.connected = false;
					}
				})
				.catch(function (error) {
					console.log(error);
				})
		},
		signOut(){
			axios.get(process.env.VUE_APP_BACK_URL + '/sign-out')
				.then((response)=> {
					console.log(response.data);
					EventBus.$emit('EVENT_NAME', 'hello');
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	},
	mounted: function() {
	EventBus.$on('EVENT_NAME',(payLoad)=> {
			console.log("EVEEEEEEEEEEEEEEEnement");
			this.amIConnected();
    	});
		this.amIConnected();
	}
}

</script>
