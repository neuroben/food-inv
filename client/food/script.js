import url from "../backend/routes.js";

fetchData().then(foods => renderData(foods));

async function fetchData() {
    const response = await fetch(`${url.strapi}/api/foods`,{
        method: "GET",
        headers: {    
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA3MDEyOTE5LCJleHAiOjE3MDk2MDQ5MTl9.zgj6hbKBnGO-oI3CDQi3GoNs_HYTiyUIkgvTMdT2K3U'
        }
    });

    const responseJson = await response.json();
    
    return responseJson.data;
}

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
        let delButton = document.createElement("button");
        let svgI = document.createElement("img");
        svgI.setAttribute("src","../icons/delete-f8.svg")

        cell.appendChild(svgI);
        newRow.appendChild(cell);
        table.appendChild(newRow);
    });
}
