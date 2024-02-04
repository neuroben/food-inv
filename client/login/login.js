import url from "../backend/routes.js";

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => { // e === event
        event.preventDefault(); // nem akarunk semmilyen előre beállított működést pl. oldal frissítés

        const formData = new FormData(form);

        const response = await fetch(`${url.strapi}/api/auth/local`, {
            method: "POST",
            body: formData,
        });
            
        const data = await response.json();
            
        if(data.user.blocked == false && data.user.confirmed == true ){
            window.location.replace(`${url.fronte}/client/food/food.html`);
        } else {
            console.log('User is either blocked or not confirmed');
        }
    });
});