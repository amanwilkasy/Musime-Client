<template>
  <div>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>

      <div class="text-center">
        <v-btn v-if="authenticated" @click="signOut">Sign Out</v-btn>
        <div v-else>

          <v-btn @click="signIn">
            Sign In
          </v-btn>

          <v-btn @click="signIn" icon>
            <v-avatar>
              <img :src="image" alt="spotify logo">
            </v-avatar>
          </v-btn>


        </div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
    const base = "https://musime.herokuapp.com/";
    const loginUrl = base + "spotify-auth/login";
    export default {
        name: "Navigation",
        data: () => ({
            items: [
                {
                    icon: "mdi-apps",
                    title: "Home",
                    to: "/"
                },
                {
                    icon: "mdi-view-dashboard",
                    title: "Graphs",
                    to: "/graphs"
                }
            ],
            clipped: false,
            drawer: false,
            miniVariant: false,
            // image: require('~/assets/spotifyIcon.png'),
            title: "Musime"
        }),
        methods: {
            signOut() {
                localStorage.clear();
                this.$store.commit("payload/setAuthenticated", false);
                this.$router.push("/");
            },
            signIn() {
                this.$axios
                    .get(loginUrl)
                    .then(res => {
                        window.location.replace(res.data);
                        history.go(-1);
                        this.$store.commit("payload/setAuthenticated", true);
                        this.$router.push("/graphs");
                    })
                    .catch(error => console.log(error.message));
            }
        },
        computed: {
            authenticated() {
                const token = this.$store.state.payload.token;
                if (token) {
                    return true;
                }
                return false;
            }
        }
    };
</script>

<style scoped>
</style>
