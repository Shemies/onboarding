document.addEventListener("DOMContentLoaded", () => {
    const userDataTable = document.getElementById("usersData"); //points on table
    let indexToEdit = null;

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
                storedUsers.forEach((user, index) => addUserRow(user, index));
                
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
        const deletecell = document.createElement("td");
        deletecell.innerHTML = `<img src="delete.png">`;
        newRow.appendChild(deletecell);
        deletecell.setAttribute("data-index", index); //adds attribute to save the index number of row

        deletecell.addEventListener("click", (event) => {
            const indexToDelete = event.target.parentElement.getAttribute("data-index"); //retrieving the index from html att (event.target: This refers to the DOM element that triggered the event)
            deleteRow(indexToDelete); // Delete row function from table and localStorage
        });

        let indexToEdit = null;
        const editcell = document.createElement("td");
        editcell.innerHTML = `<img src="edit.png">`;
        newRow.appendChild(editcell);
        editcell.setAttribute("data-index", index); //adds attribute to save the index number of row

        editcell.addEventListener("click", (event) => {
            const indexToEdit = event.target.parentElement.getAttribute("data-index"); //retrieving the index from html att (event.target: This refers to the DOM element that triggered the event)
            editRow(indexToEdit); // Delete row function from table and localStorage
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

        if (indexToEdit !== null) {
            storedUsers[indexToEdit] = { name, email, date, age };
            indexToEdit = null; // Reset edit index
        } else {
            // Check for uniqueness of name and email 
            const isNameDuplicate = storedUsers.some(user => user.name === name);
            const isEmailDuplicate = storedUsers.some(user => user.email === email);

            const nameWarning = document.getElementById("nameWarning");
            const emailWarning = document.getElementById("emailWarning");

            nameWarning.textContent = '';
            emailWarning.textContent = '';

            if (isNameDuplicate) {
                nameWarning.textContent = "User with this name already exists!";
                return;
            }
            if (isEmailDuplicate) {
                emailWarning.textContent = "User with this email already exists!";
                return;
            }

            // Create new user object
            storedUsers.push({ name, email, date, age });
        }

        // Store updated users list
        localStorage.setItem("users", JSON.stringify(storedUsers));

        // Reload the table
        loadStoredData();

        // Reset form fields and button text
        document.getElementById("myForm").reset();
        document.getElementById("submit").textContent = "Submit";
    });

    function deleteRow(index){
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        storedUsers.splice(index, 1); // Remove user from the array
        localStorage.setItem("users", JSON.stringify(storedUsers)); // Update localStorage
        loadStoredData();
    }
    // Function to edit a row
    function editRow(index) {
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers[index];

        // Populate the form fields with the existing data
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("registerationDate").value = user.date;
        document.getElementById("age").value = user.age;

        // Store index to update on form submission
        indexToEdit = index;

        // Change the submit button text to "Update"
        document.getElementById("submit").textContent = "Update";
    }

});