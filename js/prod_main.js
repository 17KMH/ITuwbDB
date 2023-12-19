$(document).ready(function(){
    prod_renderFunc = prod_render_list.render;

    var resultFunc = function(result) { // debugging
        if (result !== null) {
            console.log("Success:", result);
        } else {
            console.error("Error");
        }
    };
    
//buttons

//$("#btn_open_view_prod").click(function(){ //function for product button click // ggf als click funktion beim rendern zu einzelnen Zeilen hinzufügen
//  console.log("#btn_open_view_prod clicked."); //debbuging

    //var id = document.getElementById("inputDetailID").value; //id is taken from the database through dom-element get.ElementById, the data stores in //InputOpenID
    //var id = $("inputDetailsID").val();
    
    //prod_get_detail.getDataWithAjax(id, resultFunc); //function with parameters will be called

    $("#btn_search_prod").click(function(){
        console.log("#btn_search_prod clicked.");
        prod_get_list.getListWithAjax(prod_renderFunc);
    });

    $("#btn_create_prod").click(function(){ 
        console.log("#btn_create_prod clicked."); //debbuging
            
        var newProductData = {
            "Name": document.getElementById("inputName").value, //dom-element to get the product name
            "Type": document.getElementById("inputType").value //dom-element to get the product type
            };
        prod_post.postDataWithAjax(newProductData, resultFunc); // data from UI is sent to database
    });

    $("#btn_save_prod").click(function(){
        console.log("#btn_save_prod clicked."); //debugging

        var id = document.getElementById("inputSaveID").value;
            
        var updateProductData = {
            "ID" : id,
            "Name": document.getElementById("inputName").value,
            "Type": document.getElementById("InputType").value
        };

            prod_put.putDataWithAjax(id, updateProductData, resultFunc);
        });

    $("#btn_delete_prod").click(function(){
        console.log("#btn_delete_prod clicked.");

        document.getElementById("inputDeleteID").value;

        prod_delete.deleteDataWithAjax(id, resultFunc);
    });
    
    $("#btn_hello").click(function(){
        console.log("#btn_hello clicked.");

        hello.getHelloWithAjax(resultFunc);
    });
});