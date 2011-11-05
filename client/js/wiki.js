
(function (exports, $) {
    // JSONP client to Henri's server
    exports.makeMeAWiki = function (url) {
        url = url || "http://tokyo.local:8080/";
        // XXX
        //  make online depend on navigator.onLine
        return {
            root:   url + "_rest_/"
        ,   ls:     url + "_list_"
        ,   online: true
        ,   list:   function (cb) {
                console.log("list");
                if (this.online) {
                    $.ajax({
                        url:        this.ls
                    ,   dataType:   "jsonp"
                    ,   success:    function (data) { cb(null, data); }
                    ,   error:      function (xhr, err) { cb(err); }
                    });
                }
                else {
                    var arr = [];
                    for (var i = 0, n = localStorage.length; i < n; i++) arr.push(localStorage[i]);
                    cb(null, arr);
                }
            }
        ,   get:    function (path, cb) {
                if (this.online) {
                    $.ajax({
                        url:        this.root + path
                    ,   dataType:   "jsonp"
                    ,   success:    function (data) {
                            if ("This page is empty" === data.content) cb(404);
                            else cb(null, data);
                        }
                    ,   error:      function (xhr, err) { cb(err); }
                    });
                }
                else {
                    var cnt = localStorage.getItem(path);
                    if (cnt) cb(null, cnt);
                    else cb(404);
                }
            }
        ,   post:    function (path, cnt, cb) {
                localStorage.setItem(path, cnt);
                if (this.online) {
                    $.ajax({
                        url:        this.root + path
                    ,   type:       "POST"
                    ,   data:       { content: cnt }
                    ,   success:    function () { cb(null); }
                    ,   error:      function (xhr, err) { cb(err); }
                    });
                }
                else {
                    cb(null);
                }
            }
        ,   del:    function (path, cb) {
                localStorage.deleteItem(path);
                if (this.online) {
                    $.ajax({
                        url:        this.root + path
                    ,   type:       "DELETE"
                    ,   success:    function () { cb(null); }
                    ,   error:      function (xhr, err) { cb(err); }
                    });
                }
                else {
                    cb(null);
                }
            }
        };
    };
})(window, jQuery);
