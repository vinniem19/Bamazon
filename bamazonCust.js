var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

// DEFINING CONNECTION TO DATABASE
const db = mysql.createConnection({
    host:"localhost", 
    port: 3306,
    user: "root",
    password: "VsonJ8!",
    database: "bamazondb"
});

// Connecting to DB
db.connect(function (err) {
    if (err) throw err;
    console.log("connected at id: ", db.threadId);
    displayData();
});

// Function for define Querying Db;   ids, names, and prices of products for sale.
function displayData() {
    db.query("SELECT * FROM bamazondb.products;", function (err, res) {
        if(err) throw err;
        console.table(res);
        selectProduct();
    });
}

// Function for customer selects a product
function selectProduct(){
inquirer.prompt([
    {
        type: "input", 
        name: "productselect",
        message: "What is the item ID of the product you want to purchase? "
    },
    {
        type: "input",
        name: "quantity_ordered",
        message: "How many would you like to purchase?"
    }
]) //We have their input, now we want to display it back

.then(function (response) {
    let productSelect = parseInt(response.productselect);
    let qtyOrdered = response.quantity_ordered;
    console.log("item_id: ",productSelect);
    
    var query = db.query("SELECT * FROM products WHERE item_id = ?", productSelect, function (err, res) {
        if (err) throw err;
        if (!res.length) {
            console.log("sorry, not in stock! Please try again.");
            selectProduct();
        } else {
            var qty = parseInt(qtyOrdered);
            var stock = parseInt(res[0].stock_quantity);
            console.log("qty: ",qty);
            console.log("stock: ",stock);
            
            if (stock < qty){
                console.log("Sorry, we don't have enough in stock. Please try again.");
                selectProduct();
            } else {
                console.log("Thank you for purchasing " + qty + " " + "of "
                 + res[0].product_name + ".  Your total is " + qty * parseFloat(res[0].price));
                    stock = stock - qty;
                 db.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [stock, productSelect], 
                 function (err, result) {
                        if (err) throw err;

                        console.log("Transaction completed.");
                        inquirer.prompt({
                            type: "confirm",
                            name: "confirm",
                            message: "Do you wish to make another purchase?"
                        }).then(function(response){
                                if (response.confirm === true) {
                                    selectProduct();
                                } else {
                                    console.log("Thank you for your purchase.  Please come again.");
                    
                                    db.end();
                                }
                        })
                       // db.end();
                  } )
            }
        }

    }
    )
    
})
}
// connection.end();
    
