let employees = [];
const gridContainer = document.getElementById('grid-container');

fetch('https://randomuser.me/api/')
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
;

function displayEmployees(employeeData){
    employees = employeeData;
    let employeeHTML = ``;
    employees.forEach(employee => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
        <div class="card">
            <img src="${picture.large}" alt="" class="avatar">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `;
    });
    gridContainer.innerHTML += employeeHTML;
}