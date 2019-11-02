<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex lg12 md12>
        <v-card>
          <br/>
          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">How to interpret data?</div>
            <div class="title font-weight-light mb-2">These charts are a representation off all of your
              music in all of your playlists summed and calculated to visualize which features
              of music suits you.
            </div>
            <div class="title font-weight-light mb-2">The labels on the bottom refer to the range
              calculations based on their respective units (minutes, decibels, 0.0 - 1.0).
            </div>
            <div class="title font-weight-light mb-2">The lines are the sum total of songs within
              range of labels. The coloring of hot and cool also correlates to the sum total.
            </div>
            <div class="title font-weight-light mb-2">By looking at the heat points for every feature you can
              quantify range your ears are most likely keen to.
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex lg12 md12 v-for="analyze in graph" :key="analyze.feature">
        <v-card>
          <br/>
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
    // const data = require("temp/data.json");
    // import datas from '~/temp/data.json';
    //this.graph = this.normalizeFeatureGraph(datas.featuresGraphs);
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
            legend: "Legend",
            gradientDirection: "top",
            gradients,
            fill: true,
            type: "trend",
            autoLineWidth: false,
            lineWidth: 2,
            labelSize: 7,
            radius: 0,
            padding: 16,
            lineCap: "round",
            gradient: gradients[5]
        }),
        created() {
            this.getUserGraphFeatures();
            // this.$store.commit("payload/setAuthenticated", true);
            // this.$router.push("/graphs");
        },
        components: {},
        methods: {
            getUserGraphFeatures() {
                this.$axios
                  .get(getUserGraphFeaturesUrl)
                  .then(res => {
                      if (res.data.processState === "PROCESSING"){
                          alert("You're music analysis is under way");
                      }else{
                          this.graph = this.normalizeFeatureGraph(res.data.featuresGraphs);
                      }
                  })
                  .catch(error => console.log(error.message));
            },
            normalizeFeatureGraph(array) {
                let normalize = array;
                for (let i = 0; i < normalize.length; i++) {
                    if (normalize[i].name === "Duration") {
                        normalize[i].description = normalize[i].description.replace("milliseconds", "minutes");
                        normalize[i].labels = normalize[i].labels.map(label => Math.round(((label * 1000) / 60000) * 100) / 100);
                    }
                    normalize[i].labels = normalize[i].labels.map(String);
                }
                return normalize;
            }
        },
        computed: {}
    };
</script>
