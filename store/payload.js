export const state = () => ({
  token: false,
  client: {}
});

export const mutations = {
  setAuthenticated(state, value) {
    state.token = value;
  },
  setClient(state, value) {
    state.client = value;
  }

};
