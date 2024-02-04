import env from "./routes.js";

fetchData().then(foods => renderData(foods));

// fetching data from strapi
async function fetchData() {
    const response = await fetch(`${env.strapi}/api/foods`,{
        method: "GET",
        headers: {    
            Authorization: 'Bearer ' + env.bearer,
        }
    });

    const responseJson = await response.json();
    return responseJson.data;
}

// rendering the datatable
function renderData(foods){
    const table = document.getElementById("table");
    const propertiesToInclude = ['food', 'quantity', 'unit', 'price', 'description']; // filter the important ones

    foods.forEach(foodItem => {
        let newRow = document.createElement("tr");
        
        propertiesToInclude.forEach((property) => {
            let cell = document.createElement("td");

            cell.innerText = foodItem.attributes[property];
            newRow.appendChild(cell);
        })
        let cell = document.createElement("td");

        cell.appendChild(svgButton(foodItem.id,"del","../icons/delete-f8.svg"));
        newRow.appendChild(cell);
        table.appendChild(newRow);
    });
};

// fucntion to generate icons - that functions as a button
function svgButton(id,func,route){
    let svgButton = document.createElement("button");
    let svgI = document.createElement("img");
    svgI.setAttribute("src",`${route}`);
    svgButton.setAttribute("class",func+'-'+id);
    svgButton.appendChild(svgI);
    return svgButton;
};


document.addEventListener('DOMContentLoaded', (event) => {
    // adding new foods on button click -- rendering a new row and inserting input elements
    const newFoodButton = document.querySelector('.newFood');
    newFoodButton.addEventListener("click", (e) => {  
        e.preventDefault();
        const table = document.getElementById("table");
        let newRow = document.createElement("tr");
        
        for(let i = 0; i < 5; i++){
            let inPut = document.createElement("input");
            let cell = document.createElement("td");
            inPut.className = "input";
            inPut.setAttribute("type", "text");
            cell.appendChild(inPut);
            newRow.appendChild(cell);
        }
        let cell = document.createElement("td");
        cell.appendChild(svgButton("","save","../icons/save.svg"));
        newRow.appendChild(cell);
        table.appendChild(newRow);
    
        // after filling out inputs -> saving data and sending it to strapi 
        // on save button click refresh the page to get a new fetch
        const save = document.querySelector('.save-');
        save.addEventListener("click", async (e) => {
            e.preventDefault();
            let data = []
            for(let i = 0; i < 5; i++){
                data.push(document.getElementsByClassName("input")[i].value)
            }
            const response = await fetch(`${env.strapi}/api/foods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + env.bearer,
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
    // deleting rows
});
