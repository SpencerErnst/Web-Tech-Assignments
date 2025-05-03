
let galleryImages = [];
let currentIndex = 0;

// Initialize all jQuery effects
$(document).ready(function () {
    // Accordion dropdowns
    $(".accordion-header").click(function () {
        $(this).toggleClass("active");
        let panel = $(this).next(".accordion-panel");
        if (panel.css("max-height") !== "0px") {
            panel.css("max-height", "0");
        } else {
            panel.css("max-height", panel.prop("scrollHeight") + "px");
        }
    });

    // Populate galleryImages on page load
    $(".gallery-item").each(function () {
        let img = $(this).find("img");
        galleryImages.push({
            src: img.attr("src"),
            alt: img.attr("alt")
        });
    });

    // Image click opens lightbox
    $(".gallery-item").click(function () {
        let clickedSrc = $(this).find("img").attr("src");
        currentIndex = galleryImages.findIndex(img => img.src === clickedSrc);
        showLightbox(currentIndex);
    });

    // Close lightbox
    $(".close-lightbox, #lightbox").click(function (e) {
        if (e.target.id === "lightbox" || $(e.target).hasClass("close-lightbox")) {
            $("#lightbox").fadeOut();
            $("body").removeClass("no-scroll");
        }
    });

    // Next/prev navigation
    $("#lightbox-next").click(function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryImages.length;
        showLightbox(currentIndex);
    });

    $("#lightbox-prev").click(function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        showLightbox(currentIndex);
    });
});

function showLightbox(index) {
    $("#lightbox-image").attr("src", galleryImages[index].src);
    $("#lightbox-caption").text(galleryImages[index].alt);
    $("#lightbox").fadeIn();
    $("body").addClass("no-scroll");
}
