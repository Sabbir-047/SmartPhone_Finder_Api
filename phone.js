// fetch data
const loadPhone = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones);
}

const displayPhones = (phones) => {
    // console.log(phones);

    const displayPhoneContainer = document.getElementById('phone-container');

    // show phones dynamically
    phones.forEach(phone => {
        console.log(phone);
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

loadPhone();