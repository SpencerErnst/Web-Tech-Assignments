
// Accordion functionality
$(document).ready(function () {
    $(".accordion-header").click(function () {
        $(this).toggleClass("active");
        var panel = $(this).next(".accordion-panel");
        if (panel.css("max-height") !== "0px") {
            panel.css("max-height", "0");
        } else {
            panel.css("max-height", panel.prop("scrollHeight") + "px");
        }
    });

    // Lightbox functionality for galleries
    $(".gallery-item").click(function () {
        const src = $(this).find("img").attr("src");
        const alt = $(this).find("img").attr("alt");
        $("#lightbox-image").attr("src", src);
        $("#lightbox-caption").text(alt);
        $("#lightbox").fadeIn();
        $("body").addClass("no-scroll");
    });

    $(".close-lightbox, #lightbox").click(function () {
        $("#lightbox").fadeOut();
        $("body").removeClass("no-scroll");
    });
});
