$(document).ready(function(){
    //renderFunc = cust_render.render;

    var resultFunc = function(result) { // debugging
        if (result !== null) {
            console.log("Success:", result);
        } else {
            console.error("Error");
        }
    };

    // buttons
    $("#btn_view_cust").click(function(){
        console.log("#btn_view_cust clicked.");
        
        cust_get_list.getListWithAjax(resultFunc);
    });

    $("#btn_open_view_cust").click(function(){ // ggf als click funktion beim rendern zu einzelnen Zeilen hinzufügen
        console.log("#btn_open_view_cust clicked.");

        var id = document.getElementById("inputOpenID").value;
        
        cust_get_detail.getDataWithAjax(id, resultFunc);
    });

    $("#btn_create_cust").click(function(){
        console.log("#btn_create_cust clicked.");
        
        var newCustomerData = {
            "Name": "John Doe",
            "Address": {
                "Street": "New Street 1",
                "City": "New City",
                "Zipcode": 54321
            }
        };

        cust_post.postDataWithAjax(newCustomerData, resultFunc); // daten aus UI
    });

    $("#btn_save_cust").click(function(){
        console.log("#btn_save_cust clicked.");

        var id = document.getElementById("inputSaveID").value;
        
        var updateCustomerData = {
            "ID" : id,
            "Name": "John Doe",
            "Address": {
                "ID_Add" : id,
                "Street": "Old Street 1",
                "City": "Old City",
                "Zipcode": 55555
            }
        };

        cust_put.putDataWithAjax(id, updateCustomerData, resultFunc); // daten aus UI
    });

    $("#btn_delete_cust").click(function(){
        console.log("#btn_delete_cust clicked.");

        var id = document.getElementById("inputDeleteID").value;

        cust_delete.deleteDataWithAjax(id, resultFunc);
    });

    $("#btn_hello").click(function(){
        console.log("#btn_hello clicked.");

        hello.getHelloWithAjax(resultFunc);
    });
});