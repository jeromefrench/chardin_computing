<template>
	<div>
		<v-app style="background: rgba(0,0,0,0);"  >
			<component :is="layout">
				<router-view></router-view>
			</component>
		</v-app>
	</div>
</template>


<script>

const default_layout = "default";

export default {
  computed: {
  	  layout(){
  	  	  return (this.$route.meta.layout || default_layout) + '-layout';
  	  }
  },
  data: function(){
  	  return {
  	  }
  }
}
</script>
