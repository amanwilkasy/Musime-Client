export default function ({store, redirect, query}) {
  const token = store.state.payload.token;
  const loginSuccess = query.success;
  if (loginSuccess) {
    store.commit("payload/setAuthenticated", true);
    return redirect("/graphs");
  }
  if (!token) {
    alert("Signin Please");
    return redirect('/')
  }
}
