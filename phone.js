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

    // 5.1- show all button feature (working)
    const showAllContainer = document.getElementById('showAllContainer')
    if (phones.length > 8 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }

    // 5.2- show 8 phones only
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
                <p> Brand : ${phone.brand} </p>
                <div class="card-actions">
                    <button onclick = "phoneDetailsHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        </div>
        `
        displayPhoneContainer.appendChild(phoneContainer);

    });

    // stop toggle spinner
    handleToggleSpinner(false);
}



// 6- show details handler
const phoneDetailsHandler = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

    // show modal
    show_phone_details.showModal()
}


// 7- details
const showPhoneDetails = (phone) => {
    console.log(phone);
    const phoneDetailsContainer = document.getElementById('phone-details');
    phoneDetailsContainer.innerHTML = `
        <img class = "mx-auto" src="${phone.image}" alt="${phone.slug}">
        <h1 class = "text-2xl text-green-500"> Brand : ${phone.name}</h1>
        <p> Release Date : ${phone?.releaseDate || 'Unknown'} </p>
        <p> Chipset : ${phone?.mainFeatures?.chipSet} </p>
        <p> Display Size : ${phone?.mainFeatures?.displaySize} </p>
        <p> Memory : ${phone?.mainFeatures?.memory} </p>
        <p> Storage : ${phone?.mainFeatures?.storage} </p>
        <p> GPS : ${phone?.others?.GPS || 'No'} </p>
        <p> WLAN : ${phone?.others?.WLAN || 'No'} </p>
        <p> USB : ${phone?.others?.USB || 'No'} </p>
        <p> Bluetooth : ${phone?.others?.Bluetooth || 'No'} </p>
        <p> NFC : ${phone?.others?.NFC || 'No'} </p>
        <p> Radio : ${phone?.others?.Radio || 'No'} </p>
        <p> Sensors : ${phone?.mainFeatures?.sensors || 'No'} </p>
    `
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


// 5- show all button handler
const showAllHandler = () => {
    handleSearch(true);
}

loadPhone();