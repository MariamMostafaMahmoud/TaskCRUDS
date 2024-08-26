let title = document.getElementById('title');
let Price = document.getElementById('Price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogray = document.getElementById('catogray');
let search = document.getElementById('search');
let submit = document.getElementById('submit')
// console.log(title,Price,taxes)
let mood = "create";
let tmp;

// total
function getTotal() {
    if (Price.value != '') {
        let results = (+Price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = results;
        total.style.background = '#bc7d9d';
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(140, 3, 76)';
    }
}

// Create

let arrayData;
if (localStorage.Data != null) {
    arrayData = JSON.parse(localStorage.Data)
} else {
    arrayData = [];
}


submit.onclick = function () {
    let newObject = {
        title: title.value.toLowerCase(),
        Price: Price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogray: catogray.value.toLowerCase(),
    }
    localStorage.setItem('Data', JSON.stringify(arrayData));

    //---------------------------------
    //  count
    if (title.value != '' && Price.value != '' 
        && taxes.value != '' 
        && catogray.value != '' 
        && count.value <100){
        if (mood === 'create') {
            if (newObject.count > 1) {
                for (let x = 0; x < newObject.count; x++) {
                    arrayData.push(newObject)
                }
            } else {
                arrayData.push(newObject);
            };
        } else {
            arrayData[tmp] = newObject;
            mood = 'create';
            submit.innerHTML = 'create';
            count.style.display = "block";
        }
        clearData();
    }
 
   
    readData()
}


// Clear

function clearData() {
    title.value = '';
    Price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catogray.value = '';
    total.style.background = 'rgb(140, 3, 76)';
}
readData()
// Read Data 
function readData() {
    let table = '';
    for (let i = 0; i < arrayData.length; i++) {
        // console.log(arrayData[i]);
        table += ` <tr>
        <td>${i+1}</td>
        <td>${arrayData[i].title}</td>
        <td>${arrayData[i].Price}</td>
        <td>${arrayData[i].taxes}</td>
        <td>${arrayData[i].ads}</td>
        <td>${arrayData[i].discount}</td>
        <td>${arrayData[i].total}</td>
        <td>${arrayData[i].catogray}</td>
        <td><button onclick="updateData(${i})"  id="updata">update</button></td>
        <td><button onclick="deleteElement(${i})" id="delete">delete</button></td>
        </tr> `;
    }
    document.getElementById('tbody').innerHTML = table;
    // deletALL
    let deleteData = document.getElementById("delete_all");
    if (arrayData.length > 0) {
        deleteData.innerHTML = `<button onclick="delete_all()" >delete All (${arrayData.length})</button>`
    } else {
        deleteData.innerHTML = '';
    }
}

// DElete Element
function deleteElement(i) {
    arrayData.splice(i, 1);
    localStorage.Data = JSON.stringify(arrayData);
    readData()
}


// Delete All
function delete_all() {
    localStorage.clear();
    arrayData.splice(0, arrayData.length)
    readData()
}


// *****************************
// UPdata

function updateData(i) {
    title.value = arrayData[i].title;
    Price.value = arrayData[i].Price;
    ads.value = arrayData[i].ads;
    discount.value = arrayData[i].discount;
    getTotal()
    catogray.value = arrayData[i].catogray;
    count.style.display = 'none'
    submit.innerHTML = 'Update'
    mood = 'updata';
    tmp = i;
    scroll(
        { top: 0, behavior: "smooth" }
    )
}
// *************************
// Search 

let searchMood = 'title';

function search_id(id) {
    let search = document.getElementById("search");

    if (id == "searchTitle") {
        searchMood = 'title'
        search.placeholder = "search By title";
    } else {
        searchMood = 'Catogray'
        search.placeholder = "search By Catogray";
    }
    search.focus();
  search.value='';
  readData();
};

// Search Data

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (i = 0; i < arrayData.length; i++) {
            if (arrayData[i].title.includes(value.toLowerCase())) {
                table += ` <tr>
                            <td>${i+1}</td>
                            <td>${arrayData[i].title}</td>
                            <td>${arrayData[i].Price}</td>
                            <td>${arrayData[i].taxes}</td>
                            <td>${arrayData[i].ads}</td>
                            <td>${arrayData[i].discount}</td>
                            <td>${arrayData[i].total}</td>
                            <td>${arrayData[i].catogray}</td>
                            <td><button onclick="updateData(${i})"  id="updata">update</button></td>
                            <td><button onclick="deleteElement(${i})" id="delete">delete</button></td>
                            </tr> `;
            }
        }
    } else {
        for (i = 0; i < arrayData.length; i++) {
            if (arrayData[i].catogray.includes(value.toLowerCase())) {
                table += `<tr>
                            <td>${i+1}</td>
                            <td>${arrayData[i].title}</td>
                            <td>${arrayData[i].Price}</td>
                            <td>${arrayData[i].taxes}</td>
                            <td>${arrayData[i].ads}</td>
                            <td>${arrayData[i].discount}</td>
                            <td>${arrayData[i].total}</td>
                            <td>${arrayData[i].catogray}</td>
                            <td><button onclick="updateData(${i})"  id="updata">update</button></td>
                            <td><button onclick="deleteElement(${i})" id="delete">delete</button></td>
                            </tr>`;
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;
};
