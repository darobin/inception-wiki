(function (exports, $) {
    exports.wiki = {
        root:   "/_rest/"
    ,   online: true
    ,   get:    function (path, cb) {
            if (this.online) {
                
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
            
            }
            else {
                cb(null);
            }
        }
    ,   del:    function (path, cb) {
            localStorage.deleteItem(path);
            if (this.online) {
                
            }
            else {
                cb(null);
            }
        }
    };
    
    
})(window, jQuery);
