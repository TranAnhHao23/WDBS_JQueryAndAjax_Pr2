function getAll() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products`,

        success: function (products) {
            let content = '<tr>\n' +
                '<th> Product Name</th>\n' +
                '<th>Price</th>\n' +
                '<th>Category</th>' +
                '<th>Description</th>' +
                '<th colspan="2">Action</th></tr>'
            for (let i = 0; i < products.length; i++) {
                content += detailProduct(products[i]);
            }
            document.getElementById('tableProduct').innerHTML = content; // tại sao ở đây chỉ nhận dấu ngoặc đơn nhỉ ???
            document.getElementById("formCreate").hidden = true;
        }
    })
}

function detailProduct(product) {
    return `<tr><td >${product.name}</td><td>${product.price}</td><td >${product.category.nameCategory}</td><td>${product.description}</td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button></td>
                    <td><button class="btn btn-warning" onclick="editProduct(${product.id})">Edit</button></td>`;
}

function deleteProduct(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/products/${id}`,
        success: function () {
            getAll();
        }
    })
}

function editProduct(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/${id}`,
        success: function (product){
            $('#name').val(product.name)
            $('#price').val(product.price)
            $('#category').val(product.category.idCategory)
            $('#description').val(product.description)

            document.getElementById("formCreate").hidden = false;
            document.getElementById("form-button").onclick = function () {
                updateProduct(id);
            }
        }
    })
}

function updateProduct(id){
    let name = $('#name').val()
    let price = $('#price').val()
    let categoryId = $('#category').val()
    let description = $('#description').val()
    let newProduct = {
        name: name,
        price: price,
        description: description,
        category: {
            idCategory : categoryId,
        },
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newProduct),
        url: `http://localhost:8080/products/${id}`,
        success: function () {
            getAll();
        }
    })
    event.preventDefault();
}

function createProduct() {
    document.getElementById("formCreate").reset();
    document.getElementById("formCreate").hidden = false;
    document.getElementById("form-button").onclick = function () {
        createNewProduct();
    }
}

function createNewProduct() {
    let name = $('#name').val()
    let price = $('#price').val()
    let categoryId = $('#category').val()
    let description = $('#description').val()
    let newProduct = {
        name: name,
        price: price,
        description: description,
        category: {
            idCategory : categoryId,
        },
    };

    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newProduct),
        url: `http://localhost:8080/products`,
        success: function () {
            getAll();
        }
    })
    event.preventDefault();
}

function getAllCategory() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/categories`,

        success: function (categories) {
            let content = '<optgroup label="Select Category">'
            for (let i = 0; i < categories.length; i++) {
                content += getDetailCategory(categories[i]);
            }
            content += '</optgroup>'
            document.getElementById('category').innerHTML = content; // tại sao ở đây chỉ nhận dấu ngoặc đơn nhỉ ???
        }
    })
}

function getDetailCategory(category) {
    return `<option value="${category.idCategory}">${category.nameCategory}</option>`;
}

function searchProduct(){
    let search = document.getElementById("search").value;
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/search?search=${search}`,
        success: function (products){
            let content = '<tr>\n' +
                '<th> Product Name</th>\n' +
                '<th>Price</th>\n' +
                '<th>Category</th>' +
                '<th>Description</th>' +
                '<th colspan="2">Action</th></tr>'
            for (let i = 0; i < products.length; i++) {
                content += detailProduct(products[i]);
            }
            document.getElementById('tableProduct').innerHTML = content; // tại sao ở đây chỉ nhận dấu ngoặc đơn nhỉ ???
            document.getElementById("formCreate").hidden = true;
        }
    })
    event.preventDefault();
}

getAll();
getAllCategory();