// fetch data
const loadPhone = async (searchPhone = '13') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = (phones) => {
    // console.log(phones);

    const displayPhoneContainer = document.getElementById('phone-container');

    // clear the page before loading another data
    displayPhoneContainer.textContent = '';

    // show phones dynamically
    phones.forEach(phone => {
        // console.log(phone);
        const phoneContainer = document.createElement('div');
        phoneContainer.innerHTML = `
        <div class="card bg-gray-100 shadow-xl">
            <figure class="px-10 pt-10">
                <img src="${phone.image}" alt="${phone.slug}" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p> ${phone.brand} </p>
                <div class="card-actions">
                    <button class="btn btn-primary">Show Details</button>
                </div>
            </div>
        </div>
        `
        displayPhoneContainer.appendChild(phoneContainer);

    });
}


// search handler
const handleSearch = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    // validate search field
    if (searchText === '') {
        alert("Invalid Input. Please input valid words");
        return loadPhone();
    }
    loadPhone(searchText);
}


// toggle spinner
const handleToggleSpinner = (isLoading) => {
    
}

loadPhone();