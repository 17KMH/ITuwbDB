var cust_get_list = (function() {
    "use strict";

    var cust_get_list = {}; //erzeugen eines Objektes

    cust_get_list.list = null; //erzeugen von Attributen des Objektes
    cust_get_list.finishedWithError = false;
    cust_get_list.error = {};

    cust_get_list.init = function () { //erzeugen von Methoden des Objektes

    };

    cust_get_list.getListWithAjax = function (next_function) {

        function success_func (result) {
            if (result !== null) {
                cust_get_list.list = result;
            } else {
                cust_get_list.list = {};
            }

            next_function(result);
        };
 
        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            cust_get_list.list = {};
            cust_get_list.finishedWithError = true;
            cust_get_list.error.status = status;
            cust_get_list.error.code = xhr.status;
            cust_get_list.error.message = error;
 
            next_function();
         };
 
        $.ajax({
            method: "GET",
            url: "v1/customers",
            success: success_func,
            error: error_func
        });
    };

    return cust_get_list; // Ausgabe des erstellten Objektes
})();
/* cust_get_list speichert Rückgabewert (Objekt) einer anonyme Funktion die sofort ausgeführt wird:
    "(function() {...})()"dadurch sind Eigenschaften nur im Scope der Funktion sichtbar */

var cust_get_detail = (function() {
    "use strict";

    var cust_get_detail = {};

    cust_get_detail.data = null;
    cust_get_detail.finishedWithError = false;
    cust_get_detail.error = {};

    cust_get_detail.init = function () {

    };

    cust_get_detail.getDataWithAjax = function (id, next_function) {

        function success_func (result) {
            if (result !== null) {
                cust_get_detail.data = result;
            } else {
                cust_get_detail.data = {};
            }

            next_function(result);
        };
 
        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            cust_get_detail.data = {};
            cust_get_detail.finishedWithError = true;
            cust_get_detail.error.status = status;
            cust_get_detail.error.code = xhr.status;
            cust_get_detail.error.message = error;
 
            next_function();
         };
 
        $.ajax({
            method: "GET",
            url: "v1/customers/" + id,
            //header basic auth (403)
            success: success_func,
            error: error_func
        });
    };

    return cust_get_detail;
})();

var cust_post = (function() {
    "use strict";

    var cust_post = {};

    cust_post.finishedWithError = false;
    cust_post.error = {};

    cust_post.init = function () {

    };

    cust_post.postDataWithAjax = function (data, next_function) {

        function success_func (result) {
            next_function(result);
        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            cust_post.finishedWithError = true;
            cust_post.error.status = status;
            cust_post.error.code = xhr.status;
            cust_post.error.message = error;

            next_function();
        };

        $.ajax({
            method: "POST",
            url: "v1/customers",
            data: data,
            success: success_func,
            error: error_func
        });
    };

    return cust_post;
})();

var cust_put = (function() {
    "use strict";

    var cust_put = {};

    cust_put.finishedWithError = false;
    cust_put.error = {};

    cust_put.init = function () {

    };

    cust_put.putDataWithAjax = function (id, data, next_function) {

        function success_func (result) {
            next_function(result);
        };

        function error_func (xhr, status, error) {
            console.log("XHR", xhr);
            cust_put.finishedWithError = true;
            cust_put.error.status = status;
            cust_put.error.code = xhr.status;
            cust_put.error.message = error;

            next_function();
        };

        $.ajax({
            method: "PUT",
            url: "v1/customers/" + id,
            data: data,
            success: success_func,
            error: error_func
        });
    };

    return cust_put;
})();

var cust_delete = (function() {
    "use strict";

    var cust_delete = {};

    //cust_delete.data = null;
    cust_delete.finishedWithError = false;
    cust_delete.error = {};

    cust_delete.init = function () {

    };

    cust_delete.deleteDataWithAjax = function (id, next_function) {

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
            cust_delete.finishedWithError = true;
            cust_delete.error.status = status;
            cust_delete.error.code = xhr.status;
            cust_delete.error.message = error;
 
            next_function();
         };
 
        $.ajax({
            method: "DELETE",
            url: "v1/customers/" + id,
            //header basic auth (403)
            success: success_func,
            error: error_func
        });
    };

    return cust_delete;
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