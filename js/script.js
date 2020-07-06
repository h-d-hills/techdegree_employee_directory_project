let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.getElementById("grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))
;

function displayEmployees(employeeData){
    employees = employeeData;
    let employeeHTML = ``;
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
        <div class="card" data-index="${index}">
            <img src="${picture.large}" alt="" class="avatar"/>
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
        `;
    });
    gridContainer.innerHTML = employeeHTML;
    for(let i=0; i<12; i++){
        document.getElementsByClassName('card')[i].classList.add(`card${i}`);
    }
}

function displayModal(index) {
    let {
        name, 
        dob, 
        phone, 
        email, 
        location: {
            city, 
            street, 
            state, 
            postcode
        }, 
        picture
    } = employees[index];
    let date = new Date(dob.date);
    let modalHTML = `
        <img class='avatar' alt='' src='${picture.large}'/>
        <div class='text-container'>
            <h2 class='name'>${name.first} ${name.last}</h2>
            <p class='email'>${email}</p>
            <p class='address'>${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;
    console.log(modalHTML);
    overlay.classList.remove('hidden');
    modalContainer.innerHTML = modalHTML;    
}

gridContainer.addEventListener('click', e=>{
    if(e.target !== gridContainer){
        displayModal(e.target.closest('.card').getAttribute('data-index'));
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
});