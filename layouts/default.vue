<template> 
  <v-app>
    <Navigation />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script> 
export default {
  data: () => ({}),
  components: {
    Navigation: () => import("~/components/Navigation"),
    Footer: () => import("~/components/Footer")
  }
};
</script>
