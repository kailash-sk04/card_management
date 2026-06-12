let cards = JSON.parse(localStorage.getItem('cards')) || [];

function saveCards() {
    localStorage.setItem('cards', JSON.stringify(cards));
}

function createNewTab(tabName, action) {
    const outputDiv = document.getElementById('userOutput') || document.getElementById('managementOutput');
    // Clear previous content
    outputDiv.innerHTML = '';
    
    const tabContent = document.createElement('div');
    tabContent.id = tabName;
    tabContent.className = 'tab-content';
    outputDiv.appendChild(tabContent);

    // Run the action function and output to the new tab
    action(tabContent);

    // Open the new tab
    openTab(tabName);
}

function openTab(tabName) {
    const tabs = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }
    const activeTab = document.getElementById(tabName);
    if (activeTab) activeTab.classList.add('active');
}

function createCard(outputDiv) {
    const cno = prompt("Enter Card No:");
    const name = prompt("Enter Card Holder Name:");
    const deposit = parseFloat(prompt("Enter Initial Deposit:"));

    if (cno && name && !isNaN(deposit)) {
        cards.push({ cno, name, deposit });
        saveCards();
        outputDiv.innerHTML = `<p>Card Created Successfully!</p>`;
    } else {
        outputDiv.innerHTML = `<p>Invalid input. Please try again.</p>`;
    }
}

function depositAmount(outputDiv) {
    const cno = prompt("Enter Card No:");
    const card = cards.find(c => c.cno === cno);
    if (card) {
        const amount = parseFloat(prompt("Enter Amount to Deposit:"));
        if (!isNaN(amount) && amount > 0) {
            card.deposit += amount;
            saveCards();
            outputDiv.innerHTML = `<p>Amount Deposited Successfully!</p>`;
        } else {
            outputDiv.innerHTML = `<p>Invalid amount. Please try again.</p>`;
        }
    } else {
        outputDiv.innerHTML = `<p>Card Not Found!</p>`;
    }
}

function withdrawAmount(outputDiv) {
    const cno = prompt("Enter Card No:");
    const card = cards.find(c => c.cno === cno);
    if (card) {
        const amount = parseFloat(prompt("Enter Amount to Withdraw:"));
        if (!isNaN(amount) && amount > 0 && amount <= card.deposit) {
            card.deposit -= amount;
            saveCards();
            outputDiv.innerHTML = `<p>Amount Withdrawn Successfully!</p>`;
        } else if (amount > card.deposit) {
            outputDiv.innerHTML = `<p>Insufficient Balance!</p>`;
        } else {
            outputDiv.innerHTML = `<p>Invalid amount. Please try again.</p>`;
        }
    } else {
        outputDiv.innerHTML = `<p>Card Not Found!</p>`;
    }
}

function balanceEnquiry(outputDiv) {
    const cno = prompt("Enter Card No:");
    const card = cards.find(c => c.cno === cno);
    if (card) {
        outputDiv.innerHTML = `<table>
            <tr><th>Card No</th><td>${card.cno}</td></tr>
            <tr><th>Card Holder Name</th><td>${card.name}</td></tr>
            <tr><th>Balance</th><td>${card.deposit}</td></tr>
        </table>`;
    } else {
        outputDiv.innerHTML = `<p>Card Not Found!</p>`;
    }
}

function closeCard(outputDiv) {
    const cno = prompt("Enter Card No:");
    const index = cards.findIndex(c => c.cno === cno);
    if (index !== -1) {
        cards.splice(index, 1);
        saveCards();
        outputDiv.innerHTML = `<p>Card Closed Successfully!</p>`;
    } else {
        outputDiv.innerHTML = `<p>Card Not Found!</p>`;
    }
}

function displayAll(outputDiv) {
    if (cards.length === 0) {
        outputDiv.innerHTML = `<p>No cards available.</p>`;
        return;
    }
    
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr><th>Card No</th><th>Card Holder Name</th><th>Balance</th></tr>
        </thead>
    `;
    const tbody = table.createTBody();
    cards.forEach(card => {
        const row = tbody.insertRow();
        row.insertCell(0).innerText = card.cno;
        row.insertCell(1).innerText = card.name;
        row.insertCell(2).innerText = card.deposit;
    });
    table.appendChild(tbody);
    outputDiv.appendChild(table);
}

function modifyCard(outputDiv) {
    const cno = prompt("Enter Card No:");
    const card = cards.find(c => c.cno === cno);
    if (card) {
        card.name = prompt("Enter New Card Holder Name:", card.name);
        card.deposit = parseFloat(prompt("Enter New Balance Amount:", card.deposit));
        if (!isNaN(card.deposit) && card.deposit >= 0) {
            saveCards();
            outputDiv.innerHTML = `<p>Card Modified Successfully!</p>`;
        } else {
            outputDiv.innerHTML = `<p>Invalid balance amount. Please try again.</p>`;
        }
    } else {
        outputDiv.innerHTML = `<p>Card Not Found!</p>`;
    }
}

function deleteCard(outputDiv) {
    const cno = prompt("Enter Card No:");
    const index = cards.findIndex(c => c.cno === cno);
    if (index !== -1) {
        cards.splice(index, 1);
        saveCards();
        outputDiv.innerHTML = `<p>Card Deleted Successfully!</p>`;
    } else {
        outputDiv.innerHTML = `<p>Card Not Found!</p>`;
    }
}