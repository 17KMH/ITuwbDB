var prod_get_list = (function() {
    "use strict";

    var prod_get_list = {}; //erzeugen eines leeren Objektes

    prod_get_list.list = null; //List-Eigenshaft wird hinzugefuegt
    prod_get_list.finishedWithError = false; //Verfolgung von Fehlern
    prod_get_list.error = {}; //Speichern von Fehlern

    prod_get_list.init = function () { //???
        //prod_get_list.list = [
            //{ "ID": 1, "Name": "Dummy Produkt 1", "Type": "Type 1" },
            //{ "ID": 2, "Name": "Dummy Produkt 2", "Type": "Type 2" },
        //];
    };
    
    prod_get_list.getListWithAjax = function (next_function) {

        function success_func (result) {
            if (result !== null) {
                prod_get_list.list = result;
            } else {
                prod_get_list.list = {};
            }

            next_function(result);
        };
        
        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            prod_get_list.list = {};
            prod_get_list.finishedWithError = true;
            prod_get_list.error.status = status;
            prod_get_list.error.code = xhr.status;
            prod_get_list.error.message = error;
 
            next_function();
        };
 
        $.ajax({
            method: "GET",
            url: "v1/products",
            success: success_func,
            error: error_func
        });
    };
    
    return prod_get_list; // Ausgabe des erstellten Objektes
})();

var prod_get_detail = (function() {
    "use strict";

    var prod_get_detail = {};

    prod_get_detail.data = null;
    prod_get_detail.finishedWithError = false;
    prod_get_detail.error = {};

    prod_get_detail.init = function () {

    };

    prod_get_detail.getDataWithAjax = function (id, next_function) {

        function success_func (result) {
            if (result !== null) {
                //cust_get_detail.data = result; hier war dein Fehler
                prod_get_detail.data = result;
            } else {
                //cust_get_detail.data = {};
                prod_get_detail.data = {};
            }

            next_function(result);
        };
 
        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            prod_get_detail.data = {};
            prod_get_detail.finishedWithError = true;
            prod_get_detail.error.status = status;
            prod_get_detail.error.code = xhr.status;
            prod_get_detail.error.message = error;
 
            next_function();
         };
 
        $.ajax({
            method: "GET",
            url: "v1/products/" + id,
            //header basic auth (403)
            success: success_func,
            error: error_func
        });
    };

    return prod_get_detail;
})();

var prod_post = (function() {
    "use strict";

    var prod_post = {};

    prod_post.finishedWithError = false;
    prod_post.error = {};

    prod_post.init = function () {

    };

    prod_post.postDataWithAjax = function (data, next_function) {

        function success_func (result) {
            next_function(result);
        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            prod_post.finishedWithError = true;
            prod_post.error.status = status;
            prod_post.error.code = xhr.status;
            prod_post.error.message = error;

            next_function();
        };

        $.ajax({
            method: "POST",
            url: "v1/products",
            data: data,
            success: success_func,
            error: error_func
        });
    };

    return prod_post;
})();

var prod_put = (function() {
    "use strict";

    var prod_put = {};

    prod_put.finishedWithError = false;
    prod_put.error = {};

    prod_put.init = function () {

    };

    prod_put.putDataWithAjax = function (id, data, next_function) {

        function success_func (result) {
            next_function(result);
        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            prod_put.finishedWithError = true;
            prod_put.error.status = status;
            prod_put.error.code = xhr.status;
            prod_put.error.message = error;

            next_function();
        };

        $.ajax({
            method: "PUT",
            url: "v1/products/" + id,
            data: data,
            success: success_func,
            error: error_func
        });
    };

    return prod_put;
})();

var prod_delete = (function() {
    "use strict";

    var prod_delete = {};

    prod_delete.finishedWithError = false;
    prod_delete.error = {};

    prod_delete.init = function () {

    };

    prod_delete.deleteDataWithAjax = function (id, next_function) {

        function success_func (result) {
            if (result !== null) {
                //cust_delete.data = result;
            } else {
                //cust_get_detail.data = {};
            }

            next_function(result);
        };
 
        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            //cust_delete.data = {};
            prod_delete.finishedWithError = true;
            prod_delete.error.status = status;
            prod_delete.error.code = xhr.status;
            prod_delete.error.message = error;
 
            next_function();
         };
 
        $.ajax({
            method: "DELETE",
            url: "v1/products/" + id,
            //header basic auth (403)
            success: success_func,
            error: error_func
        });
    };

    return prod_delete;
})();

var hello = (function() {
    "use strict";

    var hello = {};

    hello.data = null;
    hello.finishedWithError = false;
    hello.error = {};

    hello.init = function () {

    };

    hello.getHelloWithAjax = function (next_function) {

        function success_func (result) {
            if (result !== null) {
                hello.data = result;
            } else {
                hello.data = {};
            }

            next_function(result);
        };
 
        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            hello.data = {};
            hello.finishedWithError = true;
            hello.error.status = status;
            hello.error.code = xhr.status;
            hello.error.message = error;
 
            next_function();
         };
 
        $.ajax({
            method: "GET",
            url: "v1/hello",
            //header basic auth (403)
            success: success_func,
            error: error_func
        });
    };

    return hello;
})();