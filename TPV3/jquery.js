/**
 * CS:GO Skins Market Analysis - jQuery Effects
 * Author: Spencer Ernst
 * Created: May 2, 2025
 * 
 * This file contains jQuery functionality including form validation
 * and additional visual effects for the website.
 */

$(document).ready(function() {
    // Initialize all jQuery components
    initFormValidation();
    initSlideshow();
    initAccordion();
    initGalleryLightbox();
    initStickerHover();
});

/**
 * Form Validation
 * Validates the contact form to ensure all required fields are completed
 * and data is in the correct format before submission.
 */
function initFormValidation() {
    // Only run if contact form exists on current page
    if(!$('#contact-form').length) return;
    
    // Form submission handler
    $('#contact-form').submit(function(e) {
        // Reset previous error messages
        $('.error-message').remove();
        let isValid = true;
        
        // Name validation (required)
        const name = $('#name').val().trim();
        if(!name) {
            $('#name').after('<span class="error-message">Please enter your name</span>');
            isValid = false;
        }
        
        // Email validation (required and format check)
        const email = $('#email').val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !emailPattern.test(email)) {
            $('#email').after('<span class="error-message">Please enter a valid email address</span>');
            isValid = false;
        }
        
        // Subject validation (required selection)
        const subject = $('#subject').val();
        if(!subject) {
            $('#subject').after('<span class="error-message">Please select a subject</span>');
            isValid = false;
        }
        
        // Interest checkboxes validation (at least one required)
        const interests = $('input[name="interests"]:checked').length;
        if(interests === 0) {
            $('.checkbox-group').after('<span class="error-message">Please select at least one interest</span>');
            isValid = false;
        }
        
        // Project interest radio validation (one required)
        const projectInterest = $('input[name="project-interest"]:checked').length;
        if(projectInterest === 0) {
            $('.radio-group').after('<span class="error-message">Please select what interests you about this project</span>');
            isValid = false;
        }
        
        // Message validation (required and minimum length)
        const message = $('#message').val().trim();
        if(!message || message.length < 20) {
            $('#message').after('<span class="error-message">Please enter a message (minimum 20 characters)</span>');
            isValid = false;
        }
        
        // If form is not valid, prevent submission
        if(!isValid) {
            e.preventDefault();
            // Scroll to first error
            $('html, body').animate({
                scrollTop: $('.error-message:first').offset().top - 100
            }, 500);
            return false;
        }
        
        // For demo purposes, show success message and prevent actual submission
        e.preventDefault();
        
        // Success animation and message
        $('#contact-form').slideUp(500, function() {
            $(this).after('<div class="success-message"><span class="icon">✓</span> Thank you for your message! I\'ll get back to you soon.</div>');
            $('.success-message').hide().fadeIn(500);
        });
    });
    
    // Live validation feedback - clear errors on input
    $('#contact-form input, #contact-form textarea, #contact-form select').on('input change', function() {
        $(this).next('.error-message').fadeOut(300, function() {
            $(this).remove();
        });
    });
}

/**
 * Featured Skins Slideshow
 * Creates an automatic slideshow with manual navigation controls
 * to display featured skin images.
 */
function initSlideshow() {
    // Only run if slideshow exists on current page
    if(!$('.slideshow').length) return;
    
    let currentSlide = 0;
    const slides = $('.slide');
    const slideCount = slides.length;
    let slideInterval;
    
    // Hide all slides except first one
    slides.hide();
    slides.eq(0).show();
    
    // Create navigation dots
    const dotsContainer = $('<div class="slideshow-dots"></div>');
    for(let i = 0; i < slideCount; i++) {
        dotsContainer.append(`<span class="dot${i === 0 ? ' active' : ''}"></span>`);
    }
    $('.slideshow').append(dotsContainer);
    
    // Create prev/next buttons
    $('.slideshow').append('<button class="slide-arrow prev-slide">❮</button>');
    $('.slideshow').append('<button class="slide-arrow next-slide">❯</button>');
    
    // Start automatic slideshow
    startSlideshow();
    
    // Click handlers for navigation
    $('.next-slide').click(function() {
        changeSlide(1);
    });
    
    $('.prev-slide').click(function() {
        changeSlide(-1);
    });
    
    $('.dot').click(function() {
        goToSlide($(this).index());
    });
    
    // Pause slideshow on hover
    $('.slideshow').hover(
        function() { clearInterval(slideInterval); }, 
        function() { startSlideshow(); }
    );
    
    // Function to start automatic slideshow
    function startSlideshow() {
        clearInterval(slideInterval);
        slideInterval = setInterval(function() {
            changeSlide(1);
        }, 5000);
    }
    
    // Function to change slides
    function changeSlide(direction) {
        const newSlide = (currentSlide + direction + slideCount) % slideCount;
        goToSlide(newSlide);
    }
    
    // Function to go to specific slide
    function goToSlide(slideIndex) {
        // Hide current slide
        slides.eq(currentSlide).fadeOut(400);
        $('.dot').eq(currentSlide).removeClass('active');
        
        // Show new slide
        currentSlide = slideIndex;
        slides.eq(currentSlide).fadeIn(400);
        $('.dot').eq(currentSlide).addClass('active');
    }
}

/**
 * Accordion Functionality
 * Creates expandable/collapsible sections for better content organization
 * and improved mobile experience.
 */
function initAccordion() {
    // Only run if accordion exists on current page
    if(!$('.accordion').length) return;
    
    // Add click handler to accordion headers
    $('.accordion-header').click(function() {
        // Toggle active class on header
        $(this).toggleClass('active');
        
        // Toggle content panel
        const panel = $(this).next('.accordion-panel');
        
        // If panel is open, close it, otherwise open it
        if(panel.height() > 0) {
            panel.css('max-height', '0px');
        } else {
            panel.css('max-height', panel.prop('scrollHeight') + 'px');
        }
    });
    
    // Close all panels by default
    $('.accordion-panel').css('max-height', '0px');
}

/**
 * Gallery Lightbox
 * Creates a lightbox effect for displaying full-size images
 * when gallery thumbnails are clicked.
 */
function initGalleryLightbox() {
    // Only run if gallery exists on current page
    if(!$('.gallery-item').length) return;
    
    // Create lightbox container if it doesn't exist
    if(!$('#lightbox').length) {
        $('body').append(`
            <div id="lightbox">
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img id="lightbox-image" src="" alt="">
                    <div id="lightbox-caption"></div>
                </div>
            </div>
        `);
    }
    
    // Open lightbox when clicking gallery items
    $('.gallery-item').click(function() {
        const imgSrc = $(this).find('img').attr('src');
        const imgAlt = $(this).find('img').attr('alt');
        const imgCaption = $(this).data('caption') || '';
        
        // Set lightbox content
        $('#lightbox-image').attr('src', imgSrc);
        $('#lightbox-image').attr('alt', imgAlt);
        $('#lightbox-caption').text(imgCaption);
        
        // Show lightbox with animation
        $('#lightbox').fadeIn(300);
        $('body').addClass('no-scroll');
    });
    
    // Close lightbox when clicking close button or outside content
    $(document).on('click', '.close-lightbox, #lightbox', function(e) {
        if(e.target === this || $(e.target).hasClass('close-lightbox')) {
            $('#lightbox').fadeOut(300);
            $('body').removeClass('no-scroll');
        }
    });
}

/**
 * Sticker Hover Effect
 * Creates an interactive effect for sticker images, showing
 * detailed information on hover.
 */
function initStickerHover() {
    // Only run if sticker items exist on current page
    if(!$('.sticker-item').length) return;
    
    // Show sticker info on hover
    $('.sticker-item').hover(
        function() {
            $(this).find('.sticker-info').slideDown(200);
        },
        function() {
            $(this).find('.sticker-info').slideUp(200);
        }
    );
    
    // For touch devices
    $('.sticker-item').on('click', function(e) {
        if($(this).find('.sticker-info').is(':hidden')) {
            e.preventDefault();
            // Hide any other open sticker info
            $('.sticker-info').slideUp(200);
            $(this).find('.sticker-info').slideDown(200);
        }
    });
}
