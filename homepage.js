function scrollToCategories() {
  // Find the categories section by its ID
  const categoriesSection = document.getElementById("categories");

  // Scroll to the categories section smoothly
  if (categoriesSection) {
    categoriesSection.scrollIntoView({ behavior: "smooth" });
  }
}
// Sample Meal Data
const meals = [
  {
    id: 1,
    name: "Grilled Chicken",
    image: "1.jpg",
    category: "keto",
    ingredients: ["Chicken Breast", "Olive Oil", "Salt", "Pepper"],
    instructions:
      "1. Preheat grill. 2. Season chicken with olive oil, salt, and pepper. 3. Grill for 6-8 minutes per side.",
  },
  {
    id: 2,
    name: "Vegetable Stir Fry",
    image: "2.jpg",
    category: "vegetarian",
    ingredients: ["Broccoli", "Carrots", "Bell Peppers", "Soy Sauce"],
    instructions:
      "1. Heat oil in a pan. 2. Add vegetables and stir fry for 5-7 minutes. 3. Add soy sauce and serve.",
  },
  {
    id: 3,
    name: "Pasta Carbonara",
    image: "3.jpg",
    category: "vegetarian",
    ingredients: ["Pasta", "Eggs", "Parmesan", "Bacon"],
    instructions:
      "1. Cook pasta. 2. Mix eggs, parmesan, and bacon. 3. Combine with pasta and serve.",
  },
  {
    id: 4,
    name: " Butter bean curry wraps",
    image: "4.jpg",
    category: "vegan",
    ingredients: ["Sauté onion, garlic, ginger; add curry spices"],
    instructions:
      "1. Stir in canned butter beans, tomatoes, coconut milk; simmer. 2 .Warm tortillas, fill with curry, greens, and toppings.",
  },
];

// DOM Elements
const mealList = document.getElementById("meal-list");
const mealDetails = document.getElementById("meal-details");
const sections = document.querySelectorAll("section");
const authLink = document.getElementById("authLink");

// Update profile link with current user's name
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  authLink.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
  authLink.href = "#";
  authLink.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  });
}

// Display Meals
function displayMeals(filterCategory = "all") {
  mealList.innerHTML = "";
  const filteredMeals =
    filterCategory === "all"
      ? meals
      : meals.filter((meal) => meal.category === filterCategory);
  filteredMeals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.className = "meal-card";
    mealCard.innerHTML = `
      <img src="${meal.image}" alt="${meal.name}" class="meal-image">
      <h3>${meal.name}</h3>
      <button onclick="showMealDetails(${meal.id})">View Recipe</button>
    `;
    mealList.appendChild(mealCard);
  });
  //resize meal card images
  resizeMealImages();
}

// Show Meal Details
function showMealDetails(mealId) {
  const meal = meals.find((m) => m.id === mealId);
  mealDetails.innerHTML = `
    <h3>${meal.name}</h3>
    <img src="${meal.image}" alt="${meal.name}" class="detail-image">
    <h4>Ingredients:</h4>
    <ul>
      ${meal.ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
    </ul>
    <h4>Instructions:</h4>
    <p>${meal.instructions}</p>
  `;
  //resize meal detail image
  resizeDetailImage();
  showSection("prepare-meal");
}

// Show Section (hides all sections then shows the target)
function showSection(sectionId) {
  sections.forEach((section) => section.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
}

// Filter Meals (for category buttons)
function filterMeals(category) {
  displayMeals(category);
  showSection("select-meal");
}

// Initial call to display all meals
displayMeals();

//resize meal card images
function resizeMealImages() {
  const mealImages = document.querySelectorAll(".meal-image");
  mealImages.forEach((image) => {
    image.style.width = "200px"; // Set your desired width
    image.style.height = "150px"; // Set your desired height
    image.style.objectFit = "cover";
  });
}

//resize meal detail image
function resizeDetailImage() {
  const detailImage = document.querySelector(".detail-image");
  if (detailImage) {
    detailImage.style.width = "300px";
    detailImage.style.height = "250px";
    detailImage.style.objectFit = "cover";
  }
}
