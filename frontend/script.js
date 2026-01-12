document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(
      "http://localhost:3000/expense/getAllExpenses",
      { headers: { Authorization: token } }
    );
    const expenses = res.data.data;

    expenses.forEach((expense) => displayExpense(expense));
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
});

async function handleSignupSubmit(e) {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:3000/user/signup", {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    });
    console.log(res.data);
    window.location.href = "./login.html";
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
    console.log(res.data);
    alert(res.data.message);
    localStorage.setItem("token", res.data.token);
    window.location.href = "./expense.html";
  } catch (error) {
    console.log(alert);
    alert(error.response?.data?.message);
  }
}

async function handleExpenses(e) {
  e.preventDefault();
  const money = e.target.expense.value;
  const description = e.target.description.value;
  const category = e.target.category.value;
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://localhost:3000/expense/addExpense",
      {
        money,
        description,
        category,
      },
      { headers: { Authorization: token } }
    );
    console.log(res.data);
    displayExpense(res.data.expense);
  } catch (error) {
    console.log(error);
  }
}

function displayExpense(expense) {
  let ul = document.getElementById("expenses");
  let li = document.createElement("li");
  li.id = expense.id;

  li.textContent =
    expense.money +
    " - " +
    expense.description +
    " - " +
    expense.category +
    " - ";

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => deleteExpense(li, expense.id));

  li.append(deleteBtn);

  ul.appendChild(li);
}

async function deleteExpense(li, id) {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.delete(
      `http://localhost:3000/expense/deleteExpense/${id}`,
      { headers: { Authorization: token } }
    );
    console.log(res.data.message);
    li.remove();
  } catch (error) {
    console.log(error.message);
  }
}

function handleCashless() {
  window.location.href = "./cashfree.html";
}
