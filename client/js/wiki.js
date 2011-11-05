(function (exports, $) {
    exports.wiki = {
        root:   "/_rest/"
    ,   online: true
    ,   get:    function (path, cb) {
            if (this.online) {
                $.ajax({
                    url:        this.root + path
                ,   dataType:   "html"
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
                ,   dataType:   "html"
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
                ,   success:    function () { cb(null); }
                ,   error:      function (xhr, err) { cb(err); }
                });
            }
            else {
                cb(null);
            }
        }
    };
    
    
})(window, jQuery);
