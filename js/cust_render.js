var cust_render = (function () {
    "use strict";
    
    // Application object.
    var cust_render = {};

	cust_render.init = function () {
		// init object here
	};

    // get json data with ajax

	cust_render.render = function (cust_list) {

        // do rendering
        var jsonObj;

        /* TEST Kristian */
        /*console.log(cust_get_list.list);*/
        /*var result = cust_get_list.list;
        
        for(var i = 0; i < result.length; i++) {
            console.log(result[i]);
        }*/

        //Wenn der Ajax Abruf keinen Fehler hatte, weitermachen, ansonsten Fehler anzeigen
        if (!cust_list.finishedWithError) {

            //Customer liste in neues Objekt laden
            jsonObj = cust_list.list;
            //Liste erstellen für finale anzeige
            var finalObj = [];
            
            //Customer Tabellen element finden
            /*var cust_table = document.getElementById('cust_table');*/

            //Bisherige Einträge löschen
            cust_table.replaceChildren([]);
        
            //Text aus der Suchleiste laden
            var search = $("#search_cust").val();
            //console.log(search);
            
            //Wenn nichts eingegeben wurde alle einträge in finale liste laden
            if(search == '') {
                finalObj = jsonObj;
            } else {
                //Ansonsten in Customer liste nach matches mit der such eingabe suchen und wenn eines gefunden wurde zur finalen liste hinzufügen
                jsonObj.forEach(function(item) {
                    if(item.ID_Cust.toString() == search || item.Name.toUpperCase().includes(search.toUpperCase())) finalObj.push(item); 
                })
            }

            /*console.log(finalObj)*/
            /*for(var i = 0; i < finalObj.length; i++) {
                console.log(finalObj[i]);
            }*/

            //für jedes element in der finalen liste rendern
            /*finalObj.forEach(function (item) {
                //table row erstellen
                var elem = document.createElement('tr');
                //atribute setzten, damit modal geöffnet wird wenn geklickt wird
                elem.setAttribute('data-bs-toggle', 'modal');
                elem.setAttribute('data-bs-target', '#modal_view_details');
                //attribut setzen für zuordnung row und customer ID
                elem.dataset.cust_id = item.ID_Cust;
                //table data elemente erstellen (ID und Name)
                var elem_td = document.createElement('td');
                elem_td.innerText = item.ID_Cust;
                var elem_td2 = document.createElement('td');
                elem_td2.innerText = item.Name;
                //table row und data elemente zusammenfügen
                elem.appendChild(elem_td);
                elem.appendChild(elem_td2);
                //table row an tablle anhängen
                cust_table.appendChild(elem);
                //event listener erstellen wenn table row geklickt wird
                elem.addEventListener("click", function(event){
                    //details für den geklickten customer laden und in die felder setzen
                    cust_get_detail.getDataWithAjax(event.currentTarget.dataset.cust_id, function(item_data){
                        document.getElementById('inputDetailsName').setAttribute('value', item_data.Name);
                        document.getElementById('inputDetailsID').setAttribute('value', item_data.ID_Cust);
                        document.getElementById('inputDetailsStreet').setAttribute('value', item_data.address.Street);
                        document.getElementById('inputDetailsHouseNumber').setAttribute('value', '187');
                        document.getElementById('inputDetailsCity').setAttribute('value', item_data.address.City);
                        document.getElementById('inputDetailsZip').setAttribute('value', item_data.address.Zipcode);
                    });  
                });
            })*/

            for(var i = 0; i < finalObj.length; i++) {
                //console.log(finalObj[i]);
                var cust = finalObj[i];

                var row = $("<tr></tr>");
                row.attr({'data-bs-toggle': 'modal', 'data-bs-target': '#modal_view_details'});
                
                row.addClass("customers");

                row.data("cust_id", cust.ID_Cust);
                /*console.log("Data: " + row.data("cust_id"));*/

                row.append($("<td></td>").text(cust.ID_Cust));
                row.append("<td>" + cust.Name + "</td>");

                row.click(function(){
                    var cust_id = $(this).data("cust_id");

                    cust_get_detail.getDataWithAjax(cust_id, function() {
                        $("#inputDetailsName").val(cust_get_detail.data.Name);
                        $("#inputDetailsID").val(cust_get_detail.data.ID_Cust);

                        var str = cust_get_detail.data.address.Street;
                        var houseNumber = str.split(" ").pop();
                        var street = str.substring(0, str.length - houseNumber.length - 1);

                        $("#inputDetailsStreet").val(street);
                        $("#inputDetailsHouseNumber").val(houseNumber);
                        $("#inputDetailsCity").val(cust_get_detail.data.address.City);
                        $("#inputDetailsZip").val(cust_get_detail.data.address.Zipcode)
                    });
                });
                
                $("#cust_table").append(row);
            }
        } else {
            var alertHeading = "Error " + cust_get_list.error.code;
            var alertText = cust_get_list.error.message;

            alert(alertHeading + ": " + alertText);
        }
    };
    return cust_render;

})();