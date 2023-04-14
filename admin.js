// attach data from the db
function displayProducts(product) {
    let tableRow = document.createElement("tr")
    tableRow.id = "table-row"
    tableRow.innerHTML = `
    <th scope="row">${product.id}</th>
    <td>${product.title}</td>
    <td>${product.description}</td>
    <td>${product.image}</td>
    <td>${product.price}</td>
    <td><button class="btn" id="edit">Edit</button></td>
    <td><button class="btn btn-light" id="delete">Delete</button></td>
    `
    document.querySelector('#table-body').append(tableRow)
    // we will add an event listener  to the edit button
    tableRow.querySelector('#edit').addEventListener('click', () => {
        // This is where we call the update function
       // updatePrice(product.id)
    })
        // we will add an event listener  to the delete button
    tableRow.querySelector('#delete').addEventListener('click', () => {
        tableRow.remove() // will only delete on the admin page
        // Call the delete function
        deleteRecord(product.id)
    })
}

// fetching data from the db
// the endpoint here is products
let base_URL = 'http://localhost:3000'
function fetchProduct() {
    fetch(`${base_URL}/products`)
    .then((res) => res.json())
    .then(products => 
        products.forEach((product) => {
            displayProducts(product)
        }))
}
fetchProduct()

// function to collect the form data
//GET
let formData;
function collectFormData () {
    let form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        formData = {
            title: e.target.name.value,
            image: e.target.image.value,
            description: e.target.description.value
        }
        // where to call the function that posts the products
        postProducts()
    })
}
collectFormData();

// POST
// 
function postProducts() {
    fetch(`${base_URL}/products`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then((res) => res.json())
    .then(products => console.log(products))
}

// DELETE
// base_URL/products/id (Here we target the specific id rather than deleting everything)
function deleteRecord(id) {
    fetch(`${base_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "apllication/json"
        }
    })
    .then((res) => res.json())
    .then(data => console.log(data))
}

// PATCH
//updating the product details

function updatePrice(id) {
    fetch(`${base_URL}/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            price: 151000
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
}