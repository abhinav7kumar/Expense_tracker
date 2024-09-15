document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseNameInput = document.getElementById('expense-name');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expensesOutput = document.getElementById('expenses-output');
    const generateButton = document.getElementById('generate-expense');
    const totalAmountDisplay = document.getElementById('total-amount');

    const predefinedExpenses = [
        { name: 'Groceries', amount: 50 },
        { name: 'Transport', amount: 20 },
        { name: 'Utilities', amount: 100 },
        { name: 'Entertainment', amount: 30 },
        { name: 'Dining Out', amount: 40 }
    ];

    let totalAmount = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const expenseName = expenseNameInput.value;
        const expenseAmount = parseFloat(expenseAmountInput.value).toFixed(2);

        if (expenseName && !isNaN(expenseAmount)) {
            addExpense(expenseName, expenseAmount);
            updateTotalAmount(parseFloat(expenseAmount));
            clearInputs();
        }
    });

    generateButton.addEventListener('click', () => {
        const randomExpense = predefinedExpenses[Math.floor(Math.random() * predefinedExpenses.length)];
        addExpense(randomExpense.name, randomExpense.amount.toFixed(2));
        updateTotalAmount(randomExpense.amount);
    });

    function addExpense(name, amount) {
        const expenseItem = document.createElement('div');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <p>Name: ${name}</p>
            <p>Amount: $${amount}</p>
            <button class="delete-btn">Delete</button>
        `;

        expensesOutput.appendChild(expenseItem);

        const deleteButton = expenseItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            expenseItem.remove();
            updateTotalAmount(-amount);
        });
    }

    function updateTotalAmount(amount) {
        totalAmount += parseFloat(amount);
        totalAmountDisplay.textContent = `Total: $${totalAmount.toFixed(2)}`;
    }

    function clearInputs() {
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
    }
});
