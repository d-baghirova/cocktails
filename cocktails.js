const url = 'http://www.thecocktaildb.com/api/json/v1/';
const apiKey = '1';
const queryParams = '/search.php?s=';


let responseField = document.getElementsByClassName('responseField')[0];
let inputField = document.querySelector('input');
let btn = document.querySelector('button');
let lis = document.querySelectorAll('li');

//helper
function ingandmes(lst) {
    let arr = [];
    let c = [];
    for (l of lst){
        let r = l.splice(3, l.length);
        arr.push(r);
    }
    return arr;
}



function ingormes(lst, c) {
    let arr = [];
    for (l of lst){
        if (c == 0){
            let r = l.slice(0, l.length/2);
            let rr = r.filter(Boolean);
            let rrr = [];
            rr.forEach(el => {rrr.push(`<td>${el}</td>`)})
            arr.push(rrr);
        } else if (c == 1){
            let r = l.slice(l.length/2, l.length);
            let rr = r.filter(Boolean);
            let rrr = [];
            rr.forEach(el => {rrr.push(`<td>${el}</td>`)})
            arr.push(rrr);
        }
    }
    return arr;
}

function pick(res) {
    let lst = [];
    for (let i = 0; i<res.drinks.length; i++){
        let v = Object.values(res.drinks[i]);
        v.splice(v.length-4, 4);
        v.splice(0,1);
        v.splice(1,5);
        v.splice(2,1);
        v.splice(3,7);
        lst.push(v);
    }
    return lst;
}

function tohtml(ing, mes){
    let trs = [];
    for (let j=0; j< ing.length; j++){
        let tr = [];
        for (let i=0; i< ing[j].length; i++){
            if (ing[j][i]!=undefined){
                if (mes[j][i]!=undefined){
                    tr.push(`<tr>${ing[j][i]} ${mes[j][i]}</tr>`)
                } else {
                    tr.push(`<tr>${ing[j][i]} <td></td></tr>`)
                }
            }
        }
        trs.push(tr);
    }
    return trs;

}

function createTable(trs) {
    let myTable = [];

    for (i of trs){
        myTable.push(i.join(''));
    }

    let lst = [];

    for (j of myTable){
        lst.push(`<table>${j}</table>`);
    }

    let str = lst.join('');

    return str;
}

function renderResponse(res) {
    let lst = [];
    for (let i = 0; i < res.drinks.length; i++){
        lst.push(`<li>
                    <div class="s">
                        <h1>${res.drinks[i].strDrink}</h1>
                        <img src = ${res.drinks[i].strDrinkThumb} />
                        <p>${res.drinks[i].strInstructions}</p>
                        <table>${tohtml(ingormes(ingandmes(pick(res)),0),ingormes(ingandmes(pick(res)),1))[i]}</table>
                    <div>
                  </li>`);
    }
    let drinks = lst.join('');
    responseField.innerHTML = `<ul>${drinks}</ul>`;
}

//async function

async function getSuggesion() {
    let wordQuery = inputField.value;
    let endpoint = url + apiKey + queryParams + wordQuery;

    try {
        let response = await fetch(endpoint, {cache: "no-cache"});
        if (response.ok){
            let jsonResponse = await response.json();
            renderResponse(jsonResponse);
        }
    } catch(error) {
        console.log(error);
    }
}

function displaySuggesion(event) {
    event.preventDefault();
    if(responseField.firstChild){
        responseField.removeChild(responseField.firstChild);
    }
    getSuggesion();
}

btn.addEventListener('click', displaySuggesion);






