(function () {
    "use strict";

    var root = document.documentElement;
    var meta = document.querySelector('meta[name="theme-color"]');
    var favicon = document.querySelector('link[rel="icon"]');
    var buttons = Array.prototype.slice.call(document.querySelectorAll(".theme-toggle"));

    function isDark() {
        return root.getAttribute("data-theme") === "dark";
    }

    function sync() {
        var dark = isDark();

        if (meta) meta.setAttribute("content", dark ? "#101214" : "#f9f9f8");
        if (favicon) favicon.setAttribute("href", dark ? "favicon-dark.ico" : "favicon.ico");

        buttons.forEach(function (button) {
            button.setAttribute("aria-pressed", String(dark));
            button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
        });
    }

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            var next = isDark() ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
            sync();
        });
    });

    sync();
})();
