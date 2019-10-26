<template>
  <v-container grid-list-lg fluid>
    <v-btn @click="getUserGraphFeatures">load graphs</v-btn>
    <!-- <v-btn @click="checkIfGraphExists">check if you graph</v-btn> -->

    <v-layout row wrap>
      <v-flex lg12 md12 v-for="analyze in graph" :key="analyze.feature">
        <v-card>
          <br />
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="cyan"
            elevation="12"
            max-width="calc(100% - 32px)"
          >
            <v-sparkline
              :value="analyze.values"
              :fill="fill"
              :labels="analyze.labels"
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
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">{{analyze.name}}</div>
            <div class="title font-weight-light mb-2">{{analyze.description}}</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
const base = "https://musime.herokuapp.com/";
const api = base + "api/";
const getUserGraphFeaturesUrl = api + "getFeaturesGraphs";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#00c6ff", "#F0F", "#FF0"],
  ["#f72047", "#ffd200", "#1feaea"]
];
export default {
  name: "Graphs",
  middleware: "authenticated",
  data: () => ({
    graph: [],
    legend: "Popularity",
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
    getUserGraphFeatures() {
      this.$axios
        .get(getUserGraphFeaturesUrl)
        .then(res => {
          this.graph = res.data.featuresGraphs;
        })
        .catch(error => console.log(error.message));
    }
  },
  computed: {}
};
</script>
