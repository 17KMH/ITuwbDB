$(document).ready(function(){

    var renderFunc = cust_render.render;
    var prod_renderFunc = prod_render_list.render;

    //render funktion aufrufen
    function show_list(){
        cust_get_list.getListWithAjax(renderFunc);
    }

    //funktion für customer seite
    function customers() {
        //customer subpage laden
        $('#content').load("customers.html", function() {
            //navbar status setzen
            Array.from(document.getElementById("nav").children).forEach(function(child) {
                child.children[0].classList.remove("active")
              })
              document.getElementById('btn_view_cust').classList.add('active')
        
              
        /*      //event listener für save button
              document.getElementById('btn_save_cust').addEventListener("click", function(){
                //geänderte daten in variable speichern
                var updateCustomerData = {
                    "ID" : $("#inputDetailsID").val(),
                    "Name": $("#inputDetailsName").val(), 
                    "Address": {
                        "ID_Add" : $("#inputDetailsID").val(),
                        "Street": $("#inputDetailsStreet").val(),
                        "City": $("#inputDetailsCity").val(),
                        "Zipcode": $("#inputDetailsZip").val(),
                    }
                };
                //ajax funktion aufrufen, die die geänderten daten an den server schickt, danach liste neu rendern
                cust_put.putDataWithAjax($("#inputDetailsID").val(), updateCustomerData, show_list);
            });
            //event listener für delete button, wenn geklickt ajax delete funktion aufrufen und liste neu rendern
            document.getElementById('btn_delete_cust_yes').addEventListener("click", function(){
                cust_delete.deleteDataWithAjax($("#inputDetailsID").val(), show_list);
                
            });
            //event listener für create button, neue daten mit ajax funktion an server senden und liste neu rendern
            $("#btn_create_cust").click(function(){
                console.log("#btn_create_cust clicked.");
                
                var newCustomerData = {
                    "Name": $("#inputName").val(),
                    "Address": {
                        "Street": $("#inputStreet").val(),
                        "City": $("#inputCity").val(),
                        "Zipcode": $("#inputZip").val()
                    }
                };
        
                cust_post.postDataWithAjax(newCustomerData, show_list);
            });
            //event listener für such button, liste neu rendern
            document.getElementById('btn_search_cust').addEventListener("click", function() {
                show_list();
                
            })
            //event listener für form submit, default event (seite neu laden) verhindern, stattdessen liste neu rendern
            document.getElementById('cust_form').addEventListener("submit", function(e) {
                e.preventDefault();
                show_list();
                
            })*/
            //bei laden der customer subpage liste rendern
            show_list();
        });
    }

    //customer subpage bei laden der seite aufrufen (standardseite)
    customers();

    //event listeener customer seite
    $("#btn_view_cust").click(function(){
        console.log("#btn_view_cust clicked.");
        customers();
    });
    
    /*$(".customers").click(function(){
        console.log("row clicked. cust_main");
        var cust_id = $(this).data("cust_id");

        var renderDetail = cust_render_details.render;

        cust_get_detail.getDataWithAjax(cust_id, renderDetail);
    });*/

    //event listener prod seite
    $("#btn_view_prod").click(function(){ 
        console.log("#btn_view_prod clicked.");
        
        $('#content').load("products.html", function() {
            Array.from(document.getElementById("nav").children).forEach(function(child) {
                child.children[0].classList.remove("active")
              })
              document.getElementById('btn_view_prod').classList.add('active')
      
              //prod_get_list.getListWithAjax(()=>{});
            prod_get_list.getListWithAjax(prod_renderFunc);            
        });
        
    });

    //event listener employee seite
    $("#btn_view_empl").click(function(){ 
        console.log("#btn_view_empl clicked.");

        $('#content').load("employees.html", function() {
            Array.from(document.getElementById("nav").children).forEach(function(child) {
                child.children[0].classList.remove("active")
              })
              document.getElementById('btn_view_empl').classList.add('active')
        });
      

    });

    //event listener activities seite
    $("#btn_view_act").click(function(){ 
        console.log("#btn_view_act clicked.");

        $('#content').load("activities.html", function() {
            Array.from(document.getElementById("nav").children).forEach(function(child) {
                child.children[0].classList.remove("active")
              })
              document.getElementById('btn_view_act').classList.add('active')
        });
        
    });
    
    //evtl. andere buttons hinzufuegen

    $("#btn_hello").click(function(){
        console.log("#btn_hello clicked.");

        hello.getHelloWithAjax(resultFunc);
    });

});