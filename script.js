
let transactions = [];

function addTransaction() {
    let amount = Number(document.getElementById("amount").value);
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (amount <= 0 || !Number.isFinite(amount)) {
        alert("Please enter a valid amount");
        return;
    }

    transactions.push({
        amount: amount,
        type: type,
        category: category
    });

    document.getElementById("amount").value = "";

    updateDisplay();
}

function updateDisplay() {
    let totalIncome = 0;
    let totalExpense = 0;
    let categories = {};

    let list = document.getElementById("list");
    let categoryList = document.getElementById("categoryList");

    list.innerHTML = "";
    categoryList.innerHTML = "";

    transactions.forEach(function(t) {
        let li = document.createElement("li");

        li.textContent = t.category + " - ₹" + t.amount + " (" + t.type + ")";
        list.appendChild(li);

        if (t.type === "income") {
            totalIncome += t.amount;
        } else {
            totalExpense += t.amount;

            if (!categories[t.category]) {
                categories[t.category] = 0;
            }

            categories[t.category] += t.amount;
        }
    });

    let balance = totalIncome - totalExpense;

    document.getElementById("income").textContent = "₹" + totalIncome;
    document.getElementById("expense").textContent = "₹" + totalExpense;
    document.getElementById("balance").textContent = "₹" + balance;

    for (let category in categories) {
        let li = document.createElement("li");

        li.textContent = category + ": ₹" + categories[category];

        categoryList.appendChild(li);
    }
}
