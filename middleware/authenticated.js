export default function ({ store, redirect }) {
  const token = store.state.payload.token;
  if (!token) {
    alert("Signin Please")
    return redirect('/')
  }
}
