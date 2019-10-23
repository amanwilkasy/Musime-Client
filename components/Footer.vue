<template>
  <v-footer :fixed="fixed" app>
    <span>&copy; {{year}}</span>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    fixed: false,
    year: new Date().getFullYear()
  })
};
</script>
