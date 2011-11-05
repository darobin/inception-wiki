(function (exports, $) {
    var wiki = makeMeAWiki();
    var app = Sammy("#page", function () {
        this.get("#/", function () {
            console.log("rerouting to index");
            this.redirect("#/index");
        });
        this.get("/#/:page", function () {
            var page = this.params.page;
            console.log("handling " + page);
            wiki.get(page, function (err, cnt) {
                console.log("page ", page, err, cnt);
                if (err) {
                    showForm(page);
                    content("This page does not exist yet, simply create it using the form above.");
                }
                else {
                    content(cnt.content);
                }
            });
        })
    });
    app.run("#/");
    
    function content (cnt) {
        console.log("setting content");
        $("#body").html(cnt);
    }
    
    function listPages () {
        console.log("list pages");
        wiki.list(function (err, data) {
            console.log("listPages", err, data);
            if (err) return alert(err);
            var $nav = $("#nav");
            $nav.empty();
            function item (href, text) {
                $nav.append($("<li><a></a></li>").find("a").text(text).attr("href", href).end());
            }
            item("/", "Home");
            for (var i = 0, n = data.length; i < n; i++) item("#/" + data[i], data[i]);
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
        // app.trans("#/" + path);
    }
})(window, jQuery);
