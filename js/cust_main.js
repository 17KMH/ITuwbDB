$(document).ready(function(){
    renderFunc = cust_render.render;

    // debugging
    var resultFunc = function(result) {
        if (result !== null) {
            console.log("Success:", result);
        } else {
            console.error("Error");
        }
    };

    // buttons

    /*$("#btn_open_view_cust").click(function(){ // ggf als click funktion beim rendern zu einzelnen Zeilen hinzufügen
        console.log("#btn_open_view_cust clicked.");

        var id = $("inputDetailsID").val(); //ID je nachdem, welcher Customer angeklickt wurde
        
        cust_get_detail.getDataWithAjax(id, resultFunc);
    });*/

    /* KRISTIAN */
    //event listener für such button, liste neu rendern
    $("#btn_search_cust").click(function(){
        console.log("#btn_search_cust clicked.");
        cust_get_list.getListWithAjax(renderFunc);
    });

    /*$(".customers").click(function(){
        console.log("row clicked. cust_main");
        var cust_id = $(this).data("cust_id");

        var renderDetail = cust_render_details.render;

        cust_get_detail.getDataWithAjax(cust_id, renderDetail);
    });*/


    $("#btn_create_cust").click(function(){
        console.log("#btn_create_cust clicked.");
        
        var newCustomerData = {
            "Name": $("#inputName").val(),
            "Address": {
                "Street": $("#inputStreet").val() + " " + $("#inputHouseNumber").val(),
                "City": $("#inputCity").val(),
                "Zipcode": $("#inputZip").val()
            }
        };

        cust_post.postDataWithAjax(newCustomerData, function() {
            cust_get_list.getListWithAjax(function() {
                cust_render.render(cust_get_list);
            });
        });
    });

    $("#btn_save_cust").click(function(){
        console.log("#btn_save_cust clicked.");

        var id = $("#inputDetailsID").val(); //ID je nachdem, welcher Customer angeklickt wurde

        var updateCustomerData = {
            "ID" : id,
            "Name": $("#inputDetailsName").val(), 
            "Address": {
                "ID_Add" : id,
                "Street": $("#inputDetailsStreet").val() + " " + $("#inputDetailsHouseNumber").val(),
                "City": $("#inputDetailsCity").val(),
                "Zipcode": $("#inputDetailsZip").val(),
            }
        };

        cust_put.putDataWithAjax(id, updateCustomerData, function() {
            cust_get_list.getListWithAjax(function() {
                cust_render.render(cust_get_list);
            });
        });
    });

    $("#btn_delete_cust").click(function(){
        console.log("#btn_delete_cust clicked.");
    });

    $("#btn_delete_cust_yes").click(function(){ 
        console.log("#btn_delete_cust_yes clicked.");

        var id = $("#inputDetailsID").val(); //ID je nachdem, welcher Customer angeklickt wurde

        cust_delete.deleteDataWithAjax(id, function() {
            cust_get_list.getListWithAjax(function() {
                cust_render.render(cust_get_list);
            });
        });
    });

    $("#btn_hello").click(function(){
        console.log("#btn_hello clicked.");

        hello.getHelloWithAjax(resultFunc);
    });
});