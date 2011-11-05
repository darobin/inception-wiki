(function (exports, $) {
    // JSONP client to Henri's server
    exports.wiki = funtion (url) {
        url = url || "http://tokyo.local:8080/_rest_/";
        // XXX
        //  make online depend on navigator.onLine
        return {
            root:   url
        ,   online: true
        ,   get:    function (path, cb) {
                if (this.online) {
                    $.ajax({
                        url:        this.root + path
                    ,   dataType:   "jsonp"
                    ,   success:    function (data) { cb(null, data); }
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
                    ,   method:     "POST"
                    ,   data:       cnt
                    ,   dataType:   "jsonp"
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
                    ,   method:     "DELETE"
                    ,   dataType:   "jsonp"
                    ,   success:    function () { cb(null); }
                    ,   error:      function (xhr, err) { cb(err); }
                    });
                }
                else {
                    cb(null);
                }
            }
        };
    }
    exports.wiki = {
    };
    
    
})(window, jQuery);
