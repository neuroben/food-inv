import url from "../backend/routes.js";

document.addEventListener('DOMContentLoaded', (event) => {
    const newFoodButton = document.querySelector('.newFood');

    newFoodButton.addEventListener("click", (e) => {
        e.preventDefault();
        const table = document.getElementById("table");
        let newRow = document.createElement("tr");
        for(i = 0; i < 5; i++){
            let cell = document.createElement("td");
            cell.innerText = `${i}`;
            cell.innerHTML = "<input class = 'input' type = 'text' style='max-width: 100%'>"
            newRow.appendChild(cell);
        }
        table.appendChild(newRow);
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const addButton = document.querySelector('.addFood');

    addButton.addEventListener("click", async (e) => {
        e.preventDefault();
        let data = []
        for(i = 0; i < 5; i++){
            data.push(document.getElementsByClassName("input")[i].value)
        }
          const response = await fetch(`${url.strapi}/api/foods`, {
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
