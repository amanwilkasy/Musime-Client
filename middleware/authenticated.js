export default function ({store, redirect, query, route}) {
  const token = store.state.payload.token;
  const loginSuccess = query.success;
  if (loginSuccess) {
    alert(JSON.stringify(query));
    store.commit("payload/setAuthenticated", true);
    return redirect('/')("/graphs");
  }
  if (!token) {
    alert("Signin Please");
    return redirect('/')
  }
}
