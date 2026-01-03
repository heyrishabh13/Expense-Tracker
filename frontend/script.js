async function handleSignupSubmit(e) {
  e.preventDefault();
  //   let name = e.target.name.value;
  //   let email = e.target.email.value;
  //   let password = e.target.password.value;

  try {
    const res = await axios.post("http://localhost:3000/user/signup", {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    alert(res.data.message);
    console.log(res.data);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:3000/user/login", {
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(res);
    alert(res.data.message);
  } catch (error) {
    console.log(alert);
    alert(error.response?.data?.message);
  }
}
