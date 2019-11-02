<template>

    <v-img :aspect-ratio="16/9" src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
      <v-row align="center" class="lightbox white--text pa-2 fill-height">
        <v-col>
          <v-card color="transparent">
            <br/>

<!--            <v-card-text class="pt-0">-->
<!--              <div class="title font-weight-light mb-2 center">Visualize Your Music</div>-->
<!--              <div class="title font-weight-light mb-2">Visualize You</div>-->
<!--            </v-card-text>-->
            <v-row
              align="center"
              justify="center"
            >
              <v-col class="text-center" cols="12">
                <h1 class="display-3 font-weight-light mb-4">Visualize Your Music</h1>
                <h1 class="display-2 font-weight-thin">Visualize You</h1>
              </v-col>
            </v-row>

            <v-sheet
              class="v-sheet--offset mx-auto"
              color="transparent"
              elevation="12"
              max-width="calc(100% - 32px)"
            >
              <v-sparkline
                :value="[20,100,40,30,50,70,120,50,30,60]"
                :fill="fill"
                :labels="['1','2','3','4','5','6','7','8','9', '10']"
                :key="legend"
                :gradient="gradient"
                :line-width="lineWidth"
                :padding="padding"
                :smooth="radius || false"
                :stroke-linecap="lineCap"
                :gradient-direction="gradientDirection"
                :type="type"
                :auto-line-width="autoLineWidth"
                :label-size="labelSize"
                auto-draw
                color="white"
              ></v-sparkline>
            </v-sheet>

          </v-card>
        </v-col>
      </v-row>
    </v-img>

</template>

<script>
    const gradients = [
        ["#222"],
        ["#42b3f4"],
        ["red", "orange", "yellow"],
        ["purple", "violet"],
        ["#00c6ff", "#F0F", "#FF0"],
        ["#f72047", "#ffd200", "#1feaea"]
    ];
export default {
  data: () => ({
      graph: [],
      legend: "Legend",
      gradientDirection: "top",
      gradients,
      fill: true,
      type: "trend",
      autoLineWidth: false,
      lineWidth: 2,
      labelSize: 7,
      radius: 5,
      padding: 16,
      lineCap: "round",
      gradient: gradients[5]
  }),
  created() {},
  components: {},
  methods: {
    // getUserGraphFeatures() {
    //   this.$axios
    //     .get(getUserGraphFeaturesUrl)
    //     .then(res => {
    //       this.graph = res.data;
    //       console.log(res.data);
    //     })
    //     .catch(error => console.log(error.message));
    // },
  },
  computed: {}
};
</script>
