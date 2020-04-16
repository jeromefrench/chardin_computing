<template>
	<div>
<v-app-bar app dark class="indigo"
prominent
shrink-on-scroll
:src="image"
>

	<v-menu
	bottom
	left
	>
		<template v-slot:activator="{ on }">
			<v-btn
			icon
			color="yellow"
			v-on="on"
			>
				<v-app-bar-nav-icon></v-app-bar-nav-icon>
			</v-btn>
		</template>

		<v-list>
			<v-list-item
			v-for="(item, i) in items"
			:key="i"
:to="item.link"
			>
			<v-list-item-title >{{ item.title }}</v-list-item-title>
			</v-list-item>
		</v-list>
	</v-menu>


	<v-toolbar-title class="headline text-uppercase pa-4">
		<v-card @click="$router.push({ name: 'podcast'}).catch(err => {})" class="pa-2" color="rgb(0, 0, 0, 0.7)" >
			<span>WORLD &nbsp;</span>
			<span class="font-weight-light">Podcast Show</span>
		</v-card>
	</v-toolbar-title>



<v-spacer></v-spacer>
<v-user></v-user>

	</br>


</v-app-bar>
	</div>
</template>

<script>

import user from '@/components/navbar/user.vue'


export default {
	data: function(){
		return {
			image: "https://picsum.photos/1920/1080?random",
			items: [
				{ title: 'Home', link: '/'},
				{ title: 'Post podcast', link: '/admin-podcast'}
			],
		}
	},
  components: {
    'v-user': user
  },
}

</script>



<style>

#link:link {
  text-decoration: none;
  color: white;
}

#link:visited {
  text-decoration: none;
  color: white;
}

#link:hover {
  text-decoration: none;
  color: white;
}

#link:active {
  text-decoration: none;
  color: white;
}

<style>
