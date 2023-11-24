// 1- fetch data
const loadPhone = async (searchPhone = '13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);

    const displayPhoneContainer = document.getElementById('phone-container');

    // clear the page before loading another data
    displayPhoneContainer.textContent = '';

    // show all button feature (working)
    const showAllContainer = document.getElementById('showAllContainer')
    if (phones.length > 8 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // show 8 phones only
    if (!isShowAll) {
        phones = phones.slice(0, 8);
    }

    // 2- show phones dynamically
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

    // stop toggle spinner
    handleToggleSpinner(false);
}


// 3- search handler
const handleSearch = (isShowAll) => {
    handleToggleSpinner(true);
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    // validate search field
    if (searchText === '') {
        alert("Invalid Input. Please input valid words");
        return loadPhone();
    }
    loadPhone(searchText, isShowAll);
}


// 4- toggle spinner
const handleToggleSpinner = (isLoading) => {
    const spinnerLoader = document.getElementById('spinner-loader');
    if (isLoading) {
        spinnerLoader.classList.remove('hidden');
    }
    else {
        spinnerLoader.classList.add('hidden');
    }
}


// show all button handler
const showAllHandler = () => {
    handleSearch(true);
}

loadPhone();