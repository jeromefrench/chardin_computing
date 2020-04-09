<template>
	<div >
		<Navbar></Navbar>
			<v-content >
				<v-row>
						<v-col cols="1" md="2" sm="1">
							<v-card tile ></v-card>
						</v-col>

						<v-col cols="10" md="8" sm="10">
							<slot></slot>
						</v-col>

						<v-col cols="1" md="2" sm="1">
							<v-card tile ></v-card>
						</v-col>
				</v-row>
			</v-content>
	</div>
</template>


<script>
// @ is an alias to /src
import Navbar from '@/components/navbar/navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
	data: function(){
		return {
		}
	},
}
</script>
