var prod_render_list = (function () {
    "use strict";
    
    // Application object.
    var prod_render_list = {};

	// init object 
	prod_render_list.init = function () {
		// init object here
	};


    // get json data with ajax
	prod_render_list.render = function () {

        // do rendering
        var jsonObj;

        /*console.log("Debugging: Customer-Liste");
        console.log(cust_get_list);*/
        
        if (!prod_render_list.finishedWithError) {

            // get saved data
            jsonObj = prod_get_list.list;
            //console.log(jsonObj)

            //Liste erstellen für finale anzeige
            var finalObj = [];

            //Bisherige Einträge löschen
            prod_table.replaceChildren([]);

            //Text aus der Suchleiste laden
            var search = $("#search_prod").val();
            //console.log("Debugging: Input Suche");
            //console.log(search);

            //Wenn nichts eingegeben wurde alle einträge in finale liste laden
            if(search == '') {
                finalObj = jsonObj;
            } else {
                //Ansonsten in Customer liste nach matches mit der such eingabe suchen und wenn eines gefunden wurde zur finalen liste hinzufügen
                jsonObj.forEach(function(item) {
                    if(item.ID_Prod.toString() == search || item.Name.toUpperCase().includes(search.toUpperCase())) finalObj.push(item); 
                })
            }
            console.log("Debugging: Suchergebnisse");
            console.log(finalObj);         
        
            for(var i = 0; i < finalObj.length; i++) {
                //console.log(finalObj[i]);
                var prod = finalObj[i];

                var row = $("<tr></tr>");
                row.attr({'data-bs-toggle': 'modal', 'data-bs-target': '#modal_view_details'});
                
                row.addClass("products");

                row.data("prod_id", prod.ID_Prod);

                row.append($("<td></td>").text(prod.ID_Prod));
                row.append("<td>" + prod.Name + "</td>");
                row.append("<td>" + prod.Type + "</td>");


                         
                row.click(function(){
                    var prod_id = $(this).data("prod_id");

                    prod_get_detail.getDataWithAjax(prod_id, function() {
                        $("#inputDetailsName").val(prod_get_detail.data.Name);
                        $("#inputDetailsID").val(prod_get_detail.data.ID_Prod);
                        $("#inputDetailsType").val(prod_get_detail.data.Type);
                    });
                });         
            
                $("#prod_table").append(row);
            }

        } else {
            var alertHeading = "Error " + prod_get_list.error.code;
            var alertText = prod_get_list.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };

    return prod_render_list;
})();