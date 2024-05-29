window.onscroll = function () { scrollFunction("navbar") };

    function scrollFunction() {
        var header = document.getElementById("header");

        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("back-to-top").style.display = "block";
        } else {
            document.getElementById("back-to-top").style.display = "none";
        }
    }
