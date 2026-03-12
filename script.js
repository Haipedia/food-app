/* --- 1. DARK MODE TOGGLE --- */
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

/* --- 2. MENU FILTERING --- */
function filterMenu(category) {
    const cards = document.querySelectorAll(".food-card");
    const tabs = document.querySelectorAll(".menu-tab");

    // Update active tab
    tabs.forEach((tab) => tab.classList.remove("active"));
    event.target.classList.add("active");

    // Show/Hide cards
    cards.forEach((card) => {
        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/* --- 3. INGREDIENT CALCULATOR (Recipe) --- */
const baseIngredients = [
    { name: "Long Grain Rice", qty: 2, unit: "Cups" },
    { name: "Tomato Paste", qty: 1, unit: "Can" },
    { name: "Chicken Stock", qty: 2, unit: "Cups" },
    { name: "Chicken", qty: 0.5, unit: "kg" },
    { name: "Vegetable Oil", qty: 0.25, unit: "Cups" }
];

function calculateIngredients() {
    const selector = document.getElementById("portionSelector");
    const multiplier = parseFloat(selector.value);
    const tableBody = document.getElementById("ingredientBody");

    tableBody.innerHTML = ""; // Clear table

    baseIngredients.forEach((ing) => {
        let newQty = ing.qty * multiplier;
        newQty = Math.round(newQty * 10) / 10;
        let row = `<tr><td><input type="checkbox"></td><td>${ing.name}</td><td><strong>${newQty}</strong> ${ing.unit}</td></tr>`;
        tableBody.innerHTML += row;
    });
}
// Run once on load
calculateIngredients();

/* --- 4. ADVANCED ORDER SYSTEM (With 4 Coupons) --- */
window.currentDiscount = 0; // Global Variable

function applyCoupon() {
    const codeInput = document.getElementById("couponCode").value.trim().toUpperCase();
    const msg = document.getElementById("couponMsg");

    // Define Discount Rates
    const coupons = {
        ABUDLC: 0.1, // 10%
        HAIPEDIATECHHUB: 0.25, // 25%
        "HUSSAINI ALIYU ISMAEEL": 0.25, // 25%
        "DR. OTEGWU JAMES": 0.5 // 50%
    };

    if (coupons.hasOwnProperty(codeInput)) {
        window.currentDiscount = coupons[codeInput];
        const percent = window.currentDiscount * 100;

        msg.style.color = "green";
        msg.innerHTML = `Success! <b>${percent}% Discount</b> Applied.`;
        updatePrice();
    } else {
        window.currentDiscount = 0;
        msg.style.color = "red";
        msg.innerText = "Invalid or Expired Code.";
        updatePrice();
    }
}

/* --- UPDATED PRICE CALCULATOR (Multi-Select) --- */
function updatePrice() {
    // 1. Get all checkboxes inside the menu
    const checkboxes = document.querySelectorAll('.checkbox-menu input[type="checkbox"]');
    const qty = parseInt(document.getElementById('qtyInput').value);
    
    // 2. Loop through them and sum up the checked ones
    let itemTotal = 0;
    checkboxes.forEach(box => {
        if (box.checked) {
            itemTotal += parseInt(box.value);
        }
    });

    // 3. Multiply by Quantity (Packs)
    let finalTotal = itemTotal * qty;

    // 4. Apply Discount if active
    if (window.currentDiscount > 0) {
        let discountAmount = finalTotal * window.currentDiscount;
        finalTotal = finalTotal - discountAmount;
    }

    // 5. Update the text
    document.getElementById('finalPrice').innerText = "₦" + finalTotal.toLocaleString();
}
function placeOrder(e) {
    e.preventDefault();
    alert("Order Placed Successfully! Your food is on the way.");
}

/* --- 5. TABS LOGIC --- */
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active-content");
    }
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

/* --- 6. SLIDER CONTROLS --- */
const slider = document.querySelector(".slider-container");
document.getElementById("nextBtn").onclick = () => {
    slider.scrollLeft += 300;
};
document.getElementById("prevBtn").onclick = () => {
    slider.scrollLeft -= 300;
};