var products = [];
var tableBody = document.getElementById('tableBody');
var productName = document.getElementById('name');
var productCategory = document.getElementById('category');
var productPrice = document.getElementById('price');
var productDescribtion = document.getElementById('describtion');
var addBtn = document.getElementById('addBtn');
var inputs = document.getElementsByClassName('form-control');
var search = document.getElementById('search');
var currentIndex = 0;  


if (JSON.parse(localStorage.getItem('productsList')) != null) {
    products = JSON.parse(localStorage.getItem('productsList'));
    displayData();
}

addBtn.onclick = function () {
    
    if (addBtn.innerHTML == 'update product') {
        newProduct()
    }
    else {
        addProduct();
    }
    displayData();
    resetForm();
}


function addProduct() {
    var product =
    {
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        describtion: productDescribtion.value,
    }
    products.push(product);
    localStorage.setItem('productsList', JSON.stringify(products));


}

function displayData(){
    var cartona = '';
    for (var i = 0; i < products.length; i++) {
        cartona += `
       <tr>
       <td> ${ i +1} </td>
       <td> ${ products[i].name } </td>
       <td> ${ products[i].category}  </td>
       <td> ${ products[i].price } </td>
       <td> ${products[i].describtion}</td>
       <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>delete</button></td>
       <td><button onclick='updateProduct(${i})' class='btn btn-warning'>update</button></td>
       </tr>`;
    }
  document.getElementById('tableBody').innerHTML = cartona;

}

function deleteProduct(index) {
    products.splice(index, 1);
    displayData();
    localStorage.setItem('productsList', JSON.stringify(products));

}

function resetForm() {
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }

}


search.onkeyup = function () {
    var cartona = '';
    var val = search.value;
    for (var i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(val.toLowerCase())) {


            cartona += `
       <tr>
       <td> ${i + 1} </td>
       <td> ${products[i].name} </td>
       <td> ${products[i].category}  </td>
       <td> ${products[i].price} </td>
       <td> ${products[i].describtion}</td>
       <td><button onclick='updateProduct(${i})' class='btn btn-info'>update</button></td>
       <td><button onclick='deleteProduct(${i})' class='btn btn-danger'>delete</button></td>


       </tr>`;
        }
        document.getElementById('tableBody').innerHTML = cartona;
    }
}

function updateProduct(index) {
    currentIndex = index;
    productName.value = products[index].name;
    productCategory.value = products[index].category;
    productPrice.value = products[index].price;
    productDescribtion.value = products[index].describtion;
    addBtn.innerHTML = 'update product';
          
        }

function newProduct() {
    products[currentIndex].name = productName.value;
    products[currentIndex].category = productCategory.value;
    products[currentIndex].price = productPrice.value;
    products[currentIndex].describtion = productDescribtion.value;

    localStorage.setItem('productsList', JSON.stringify(products));
    addBtn.innerHTML = 'add product';
}