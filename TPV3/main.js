/**
 * CS:GO Skins Market Analysis - Main JavaScript
 * Author: Spencer Ernst
 * Created: May 2, 2025
 * 
 * This file contains core JavaScript functionality including
 * style manipulation and conditional logic features.
 */

// Document ready function to initialize JavaScript features
document.addEventListener("DOMContentLoaded", function() {
    // Initialize all components
    initThemeToggle();
    initMobileNav();
    initMarketStatus();
    initHoverEffects();
    
    // Set up calculator if it exists on the page
    if(document.getElementById('calculate-price')) {
        document.getElementById('calculate-price').addEventListener('click', calculateSkinPrice);
    }
});

// Theme switcher - Changes style of the website
function initThemeToggle() {
    // Create theme toggle button
    const header = document.querySelector('header');
    if(!header) return;
    
    const themeBtn = document.createElement('button');
    themeBtn.id = 'theme-toggle';
    themeBtn.innerHTML = '<span class="icon-light">☀️</span><span class="icon-dark">🌙</span>';
    themeBtn.classList.add('theme-btn');
    themeBtn.addEventListener('click', toggleTheme);
    header.appendChild(themeBtn);
    
    // Check for saved theme preference
    if(localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    if(document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Mobile Navigation Menu
function initMobileNav() {
    const nav = document.querySelector('nav');
    if(!nav) return;
    
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    nav.insertBefore(mobileMenuBtn, nav.firstChild);
}

// Toggle mobile menu visibility
function toggleMobileMenu() {
    const navList = document.querySelector('nav ul');
    navList.classList.toggle('show');
    document.querySelector('.mobile-menu-btn').classList.toggle('active');
}

// Market Status Indicator - Uses conditional logic based on time of year
function initMarketStatus() {
    const marketStatus = document.getElementById('market-status');
    if(!marketStatus) return;
    
    // Get current month to determine market status
    const currentMonth = new Date().getMonth();
    
    // Set status based on current month (conditional logic)
    let status, message, color;
    
    if(currentMonth >= 10 || currentMonth <= 1) { 
        // Winter months (Nov-Feb): Higher prices
        status = "STRONG";
        message = "Winter typically sees higher prices due to increased player activity.";
        color = "#4CAF50"; // Green
    } else if(currentMonth >= 5 && currentMonth <= 8) { 
        // Summer months (Jun-Sep): Lower prices
        status = "WEAK";
        message = "Summer months typically show reduced player counts and lower prices.";
        color = "#F44336"; // Red
    } else { 
        // Spring/Fall: Moderate market
        status = "NEUTRAL";
        message = "Transitional season with balanced buying/selling activity.";
        color = "#FF9800"; // Orange
    }
    
    // Update the market status display
    marketStatus.querySelector('.status-value').textContent = status;
    marketStatus.querySelector('.status-value').style.color = color;
    marketStatus.querySelector('.status-message').textContent = message;
}

// Skin Price Calculator - Uses conditional statements for price determination
function calculateSkinPrice() {
    // Get selected values
    const category = document.getElementById('skin-category').value;
    const wear = document.getElementById('skin-wear').value;
    const rarity = document.getElementById('skin-rarity').value;
    const resultBox = document.getElementById('price-result');
    
    // Validate selections
    if(!category || !wear || !rarity) {
        resultBox.innerHTML = '<p class="error">Please select all options to calculate price</p>';
        return;
    }
    
    // Calculate price ranges based on selections (conditional logic)
    let basePrice = 0;
    
    // Conditional base price based on category
    switch(category) {
        case 'knife':
            basePrice = 100;
            break;
        case 'rifle':
            basePrice = 15;
            break;
        case 'pistol':
            basePrice = 5;
            break;
        case 'smg':
            basePrice = 3;
            break;
    }
    
    // Rarity multiplier (conditional)
    let rarityMultiplier = 1;
    switch(rarity) {
        case 'covert':
            rarityMultiplier = 15;
            break;
        case 'classified':
            rarityMultiplier = 8;
            break;
        case 'restricted':
            rarityMultiplier = 4;
            break;
        case 'mil-spec':
            rarityMultiplier = 2;
            break;
        case 'industrial':
            rarityMultiplier = 1;
            break;
        case 'consumer':
            rarityMultiplier = 0.5;
            break;
    }
    
    // Wear condition multiplier (conditional)
    let wearMultiplier = 1;
    switch(wear) {
        case 'factory-new':
            wearMultiplier = 2;
            break;
        case 'minimal-wear':
            wearMultiplier = 1.5;
            break;
        case 'field-tested':
            wearMultiplier = 1;
            break;
        case 'well-worn':
            wearMultiplier = 0.7;
            break;
        case 'battle-scarred':
            wearMultiplier = 0.5;
            break;
    }
    
    // Calculate price range
    const estPrice = basePrice * rarityMultiplier * wearMultiplier;
    const minPrice = Math.round(estPrice * 0.8);
    const maxPrice = Math.round(estPrice * 1.2);
    
    // Determine price class based on value (conditional)
    let priceClass = '';
    if(estPrice >= 100) {
        priceClass = 'high-value';
    } else if(estPrice >= 20) {
        priceClass = 'medium-value';
    } else {
        priceClass = 'low-value';
    }
    
    // Generate recommendation (conditional)
    let recommendation = '';
    if(estPrice >= 100) {
        recommendation = 'High-value item with strong investment potential.';
    } else if(estPrice >= 20) {
        recommendation = 'Moderate value, consider for medium-term investment.';
    } else {
        recommendation = 'Low value, better for trade-up contracts or short-term flips.';
    }
    
    // Display the result
    resultBox.innerHTML = `
        <div class="price-result-inner">
            <h4>Estimated Price Range:</h4>
            <p class="price ${priceClass}">$${minPrice} - $${maxPrice}</p>
            <p class="recommendation">${recommendation}</p>
        </div>
    `;
}

// Initialize hover effects for skin displays
function initHoverEffects() {
    // Add hover effect to skin cards when mouse enters
    const skinCards = document.querySelectorAll('.skin-card');
    skinCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}
