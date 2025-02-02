document.addEventListener("DOMContentLoaded", () => {
    const userDataTable = document.getElementById("usersData"); //points on table

    // load stored data from localStorage
    function loadStoredData() {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
         // Clear table before reloading data
            userDataTable.innerHTML = `
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Age</th>
                    <th colspan="2">Actions </th>
                </tr>`; // Reset the table header
        storedUsers.forEach(user => addUserRow(user));
    }

    // Function to add a row to the table
    function addUserRow(user, index) { //attr user and index
        const newRow = document.createElement("tr"); 
        [user.name, user.email, user.date, user.age].forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            newRow.appendChild(cell);
        });
        //add delete button to each row
        const cell = document.createElement("td");
        const deleterow = document.createElement("button");
        deleterow.textContent  = "Del"
        cell.appendChild(deleterow);
        newRow.appendChild(cell);
        deleterow.setAttribute("data-index", index); //adds attribute to save the index number of row

        deleterow.addEventListener("click", (event) => {
            const indexToDelete = event.target.getAttribute("data-index"); //retrieving the index from html att (event.target: This refers to the DOM element that triggered the event)
            deleteRow(indexToDelete); // Delete row function from table and localStorage
        });
        const cell2 = document.createElement("td");
        const edit = document.createElement("button");
        edit.textContent  = "edit"
        cell2.appendChild(edit);
        newRow.appendChild(cell2);
        edit.setAttribute("data-index", index); //adds attribute to save the index number of row

        deleterow.addEventListener("click", (event) => {
            const indexToDelete = event.target.getAttribute("data-index"); //retrieving the index from html att (event.target: This refers to the DOM element that triggered the event)
            deleteRow(indexToDelete); // Delete row function from table and localStorage
        });
        userDataTable.appendChild(newRow);
    }

    // Load stored data on page load calls function loadstoreddata
    loadStoredData();

    document.getElementById("myForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevents form from reloading the page

        // Capture input values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const date = document.getElementById("registerationDate").value;
        const age = document.getElementById("age").value;

        // Check for uniqueness of name and email 
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const isNameDuplicate = storedUsers.some(user => user.name === name);
        const isEmailDuplicate = storedUsers.some(user => user.email === email);

        // Get warning elements
        const nameWarning = document.getElementById("nameWarning");
        const emailWarning = document.getElementById("emailWarning");

        // Reset warnings
        nameWarning.textContent = '';
        emailWarning.textContent = '';

        if (isNameDuplicate) {
             // Show the name warning
            nameWarning.textContent = "User with this name already exists!";
            return; // Prevent form submission
        }
        if (isEmailDuplicate) {
             // Show the email warning
            emailWarning.textContent = "User with this email already exists!";
            return; // Prevent form submission
        }

        // Create user object
        const user = { name, email, date, age };

        // Store the user in localStorage
        storedUsers.push(user);
        localStorage.setItem("users", JSON.stringify(storedUsers));

        // Add user to table
        addUserRow(user, storedUsers.length - 1);

        // Clear input fields after submission
        document.getElementById("myForm").reset();
    });

    function deleteRow(index){
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        storedUsers.splice(index, 1); // Remove user from the array
        localStorage.setItem("users", JSON.stringify(storedUsers)); // Update localStorage
        loadStoredData();
    }

    
});