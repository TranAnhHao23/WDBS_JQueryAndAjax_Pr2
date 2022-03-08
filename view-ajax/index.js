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
            document.getElementById("tableProduct").innerHTML = content; // tại sao ở đây chỉ nhận dấu ngoặc đơn nhỉ ???
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
        success: function (product) {
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

function updateProduct(id) {
    let name = $('#name').val()
    let price = $('#price').val()
    let categoryId = $('#category').val()
    let description = $('#description').val()
    let newProduct = {
        name: name,
        price: price,
        description: description,
        category: {
            idCategory: categoryId,
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
            idCategory: categoryId,
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

function getAllCategorySelect() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/categories`,

        success: function (categories) {
            let content = '<optgroup label="Select Category">\n' +
                '<option value="0">All Category</option>'
            for (let i = 0; i < categories.length; i++) {
                content += getDetailCategory(categories[i]);
            }
            content += '</optgroup>'
            document.getElementById('categoryList').innerHTML = content; // tại sao ở đây chỉ nhận dấu ngoặc đơn nhỉ ???
            document.getElementById("formCreateCategory").hidden = true;
        }
    })
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

function searchProduct() {
    let search = document.getElementById("search").value;
    let firstPrice = document.getElementById("firstPrice").value;
    let secondPrice = document.getElementById("secondPrice").value;
    let idCategory = document.getElementById("categoryList").value;

    $.ajax({
        type: "GET",
        url: `http://localhost:8080/products/searchFull?search=${search}&firstPrice=${firstPrice}&secondPrice=${secondPrice}&idCategory=${idCategory}`,
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
    event.preventDefault();
}

function listCategory() {
    document.getElementById("product-button-div").hidden = false;
    document.getElementById("category-button-div").hidden = true;
    document.getElementById("listCategory").hidden = false;
    document.getElementById("listProduct").hidden = true;
}

function getListCategory() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/categories`,

        success: function (categories) {
            let content = '<tr>\n' +
                '<th> Category Name</th>\n' +
                '<th>Action</th></tr>'
            for (let i = 0; i < categories.length; i++) {
                content += getDetailCategory1(categories[i]);
            }
            document.getElementById("tableCategory").innerHTML = content; // tại sao ở đây chỉ nhận dấu ngoặc đơn nhỉ ???
        }
    })
}

function getDetailCategory1(category) {
    return `<tr><td>${category.nameCategory}</td>\n` +
        `<td><button class="btn btn-danger" onclick="deleteCategory(${category.idCategory})">Delete</button></td></tr>`;
}

function deleteCategory(idCategory) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/categories/${idCategory}`,
        success: function () {
            getAllCategorySelect();
        }
    })
}

function listProduct() {
    document.getElementById("product-button-div").hidden = true;
    document.getElementById("category-button-div").hidden = false;
    document.getElementById("listCategory").hidden = true;
    document.getElementById("listProduct").hidden = false;
}

function createCategory() {
    document.getElementById("formCreateCategory").reset();
    document.getElementById("formCreateCategory").hidden = false;
    document.getElementById("form-button-category").onclick = function () {
        createNewCategory();
    }
}

function createNewCategory() {
    let name = $('#nameCategory').val()
    let newCategory = {
        nameCategory: name,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newCategory),
        url: `http://localhost:8080/categories`,
        success: function () {
            getAllCategorySelect();
        }
    })
    event.preventDefault();
}

getAll();
getAllCategory();
getAllCategorySelect();
getListCategory();