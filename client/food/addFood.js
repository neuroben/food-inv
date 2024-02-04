console.log('addFood is loaded')

document.addEventListener('DOMContentLoaded', (event) => {
    const newFoodButton = document.querySelector('.newFood');

    newFoodButton.addEventListener("click", (e) => {
        e.preventDefault();
        const table = document.getElementById("table");
        let newRow = document.createElement("tr");
        for(i = 0; i < 5; i++){
            let cell = document.createElement("td");
            cell.innerText = `${i}`;
            cell.innerHTML = "<input class = 'input"/*-"+`${i}`+"'*/+" type = 'text' style='max-width: 100%'>"
            /* semmi szükség túlbonyolítani indexeléssel haha de erre persze csak utána ... */
            newRow.appendChild(cell);
        }
        table.appendChild(newRow);
    });
});

/*
let data = []

document.addEventListener('DOMContentLoaded', (event) => {
    const addButton = document.querySelector('.addFood');
    
    addButton.addEventListener("click", async (e) => {

    for(i = 0; i < 5; i++){
        console.log(document.getElementsByClassName("input")[i].value);
        //console.log(document.getElementsByClassName("input-"+`${i}`)[0].value);
        //data.push(document.getElementByClassName("input-"+`${i}`)[0].value); ezeket azért itt hagyom :D

    }

    });
});

console.log(data);
*/

document.addEventListener('DOMContentLoaded', (event) => {
    const addButton = document.querySelector('.addFood');

    addButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let data = []
        for(i = 0; i < 5; i++){
            data.push(document.getElementsByClassName("input")[i].value)
        }
        /*
        const entry = await strapi.entityService.create('api::food.food', {
            data: {
              food: data[0],
              quantity: data[1],
              unit: data[2],
              price: data[3],
              description: data[4]
            }
          });
          */
          const response = await fetch('https://1337-neuroben-foodinv-inb7p9a3qw8.ws-eu108.gitpod.io/api/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3MDEyOTE5LCJleHAiOjE3MDk2MDQ5MTl9.zgj6hbKBnGO-oI3CDQi3GoNs_HYTiyUIkgvTMdT2K3U'
            },
            body: JSON.stringify({
                'data': {
                'food': data[0],
                'quantity': data[1],
                'unit': data[2],
                'price': data[3],
                'description': data[4]
                }
            })
        });
        location.reload()
    });
});
