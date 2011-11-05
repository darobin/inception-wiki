(function (exports, $) {
    var app = Davis(function () {
        this.get("/", function () {
            location.pathname = "/index";
        });
        this.get("/:path", function (req) {
            wiki.get(req.params["path"], function (err, cnt) {
                if (err) {
                    showForm(path);
                    content("This page does not exist yet, simply create it using the form above.");
                }
                else {
                    content(cnt);
                }
            });
        })
    });
    
    function content (cnt) {
        $("#body").html(cnt);
    }
    
    var wiki = makeMeAWiki();
    function listPages () {
        wiki.list(function (err, data) {
            if (err) return alert(err);
            var $nav = $("#nav");
            $nav.empty();
            function item (href, text) {
                $nav.append($("<li><a></a></li>").find("a").text(text).attr("href", href).end());
            }
            item("/", "Home");
            for (var i = 0, n = data.length; i < n; i++) item(data[i].name, data[i].value);
        });
    }
    listPages();
    
    $("#create").click(showForm);
    function showForm (path) {
        var $form = $("#new-page")
        $form[0].reset();
        if (path) $("#page-path").val(path);
        $form.show();
        $form.find("input:first").focus();
        $form.submit(function (ev) {
            var path = $("#page-path").val()
            ,   content = $("#page-content").val();
            wiki.post(path, content, function (err) {
                if (err) return alert(err);
                console.log("navigating to path")
                navigate(path);
            });
            $form.hide();
            listPages();
            return false;
        });
    }
    function navigate (path) {
        location.pathname = "/" + path;
    }
})(window, jQuery);
