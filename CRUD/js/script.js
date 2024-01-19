/**
 * CRUD Operations 
 *  c => create
 *  r => read
 *  u => update
 *  d => delete
 *  s => search 
 */

/**
 * to store Data 
 * 
 * => local storage
 * => browser storage
 *      
 * ====>types (cookies , session storage , local storage)
 * ====>size  (   4kb  ,        4Mb      ,      8Mb      )
 * ====>save  (customize , until your tap is open  ,  until you delete it )
 * 

 */
//=========================================================================
/*                          Reading data                               */
var productNameInput = document.getElementById("pn");
var productPriceInput = document.getElementById("pp");
var productCategoryInput = document.getElementById("pc");
var productDescriptionInput = document.getElementById("pd");
//=========================================================================
// store  array in local storage 
if (localStorage.getItem('products') != null) {
    var allProducts = JSON.parse(localStorage.getItem('products'));
    DisplayProducts();
} else {
    var allProducts = [];
}
//==========================================================================
//function add products to add products

function AddProduct() {
    var product = {
        name: productNameInput.value,
        price: Number(productPriceInput.value),
        category: productCategoryInput.value,
        description: productDescriptionInput.value
    };
    allProducts.push(product);
    localStorage.setItem('products', JSON.stringify(allProducts));
    ClearForm();
    DisplayProducts();
}
//function clear to clear inputs after add products
function ClearForm() {
    productNameInput.value = "";
    productPriceInput.value = "";
    productCategoryInput.value = "";
    productDescriptionInput.value = "";
}
//===================================================================
//function display data
function DisplayProducts() {
    var storeData = "";
    for (let i = 0; i < allProducts.length; i++) {
        storeData += `<tr>
                        <td>${allProducts[i].name}</td>
                        <td>$${allProducts[i].price}</td>
                        <td>${allProducts[i].category}</td>
                        <td>${allProducts[i].description}</td>
                        <td>
                            <button onclick="Delete(${i})" class="btn btn-danger">Delete</button>
                        </td>
                        <td>
                            <button onclick="Update(${i})" class="btn btn-warning">Update</button>
                        </td>
                    </tr>`;
    }
    document.getElementById("product_display").innerHTML = storeData;
}

function Delete(index) {
    allProducts.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(allProducts));
    DisplayProducts();
}
//=========================================================================
//function update

function Update(index) {
    // Populate the form with the values of the product at the given index
    productNameInput.value = allProducts[index].name;
    productPriceInput.value = allProducts[index].price;
    productCategoryInput.value = allProducts[index].category;
    productDescriptionInput.value = allProducts[index].description;


    //Update button
    updateBtn = document.getElementById("addBtn");
    updateBtn.innerText = "Update";
    updateBtn.onclick = function () {
        // Save the updated values to the product at the given index
        allProducts[index] = {
            name: productNameInput.value,
            price: Number(productPriceInput.value),
            category: productCategoryInput.value,
            description: productDescriptionInput.value
        };

        // Save the updated products to localStorage
        localStorage.setItem('products', JSON.stringify(allProducts));
        DisplayProducts();
        RestAdd();
    };
}
//function rest update-btn to add-btn
function RestAdd() {
    updateBtn = document.getElementById("addBtn");
    updateBtn.innerText = "Add Product";
}

//==================================================================
//function search
var search = document.getElementById("search");
function SearchElement() {
   // Variable to store the HTML for search results
    var searchResultsHTML = ""; 

    for (let i = 0; i < allProducts.length; i++) {
        if (allProducts[i].name.toLowerCase().startsWith(search.value.toLowerCase())) {
            searchResultsHTML += `<tr>
                <td>${allProducts[i].name}</td>
                <td>${allProducts[i].price}</td>
                <td>${allProducts[i].category}</td>
                <td>${allProducts[i].description}</td>
                <td>
                    <button onclick="Delete(${i})" class="btn btn-danger">Delete</button>
                </td>
                <td>
                    <button onclick="Update(${i})" class="btn btn-warning">Update</button>
                </td>
            </tr>`;
        }
    }

    // Display search results in the product_display table body
    document.getElementById("product_display").innerHTML = searchResultsHTML;
}

