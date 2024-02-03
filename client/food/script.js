console.log('food script loaded!');

fetch('https://1337-neuroben-foodinv-inb7p9a3qw8.ws-eu108.gitpod.io/api/foods',{
    method: "GET",
    headers: {    
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA2OTkxMzg3LCJleHAiOjE3MDk1ODMzODd9.mQIrZ9lKCXFccT2HL77ZpGzasPrEbKEnieiAYn94uAs'
    }
})
    .then(function (response){
        return response.json();
    })
    .then(apiJsonData => apiJsonData.data)
    .then(function (apiJsonData){
        console.log(apiJsonData);
        renderData(apiJsonData);
    });

function renderData(foods){
    const table = document.getElementById("table");
    const propertiesToInclude = ['food', 'quantity', 'unit', 'price', 'description']; // filter the important ones
    let counter = 0;
    foods.forEach(foodItem => {
        let newRow = document.createElement("tr");
        if (counter % 2 != 0){
            newRow.style.backgroundColor = "#313235";
        }
        propertiesToInclude.forEach((property) => {
            let cell = document.createElement("td");
            cell.innerText = foodItem.attributes[property];
            newRow.appendChild(cell);
        })
        table.appendChild(newRow);
        counter++;
    });
}
