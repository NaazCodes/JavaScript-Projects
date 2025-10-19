const searchInput = document.getElementById("search-input");
const searchbtn = document.getElementById("search-button");
const results = document.getElementById("results-container");
const typingText = document.getElementById("typing-text");
const loader = document.getElementById("mp-loader");

if (sessionStorage.getItem("storedRecipe")) {
  const showStoredResult = JSON.parse(sessionStorage.getItem("storedRecipe"));
  showStoredResult.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    const name = document.createElement("h3");
    name.textContent = recipe.strMeal;

    const image = document.createElement("img");
    image.classList.add("recipe-img");
    image.src = recipe.strMealThumb;
    image.alt = recipe.strMeal;

    const instructions = document.createElement("pre");
    instructions.innerHTML = "<span><b>Craving this?</b></span>\n Click to see how it’s made →";

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(instructions);

    results.appendChild(card);

    card.addEventListener("click", () => {
      window.location.href = `recipe.html?id=${recipe.idMeal}`;
    });
  });
}

const searchValue = () => {
  console.log(searchInput.value.trim());
  if (searchInput.value === "") {
    alert("Please enter a recipe name");
    hideLoader();
    return;
  }
  showLoader();

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.value}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.meals == null) {
        results.innerHTML = '<h2 class="no-result">No recipe found</h2>';
        hideLoader();
        return;
      }

      sessionStorage.removeItem("storedRecipe");
      sessionStorage.setItem("storedRecipe", JSON.stringify(data.meals));

      results.innerHTML = "";

      data.meals.forEach((recipe) => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        const name = document.createElement("h3");
        name.textContent = recipe.strMeal;

        const image = document.createElement("img");
        image.classList.add("recipe-img");
        image.src = recipe.strMealThumb;
        image.alt = recipe.strMeal;

        const instructions = document.createElement("p");
        instructions.textContent = recipe.strInstructions.slice(0, 100) + "...";

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(instructions);

        results.appendChild(card);

        card.addEventListener("click", () => {
          window.location.href = `recipe.html?id=${recipe.idMeal}`;
        });
      });
      hideLoader();
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
      hideLoader();
    });

  clearInput();
};
const clearInput = () => {
  searchInput.value = "";
};

const clearResult = () => {
  results.innerHTML = "";
};

const texts = [
  "Find your favorite recipe",
  "Cook what you love",
  "Flavors for your mood",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typeText = () => {
  const currentText = texts[textIndex];

  if (!isDeleting) {
    typingText.innerHTML = currentText.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeText, 1000);
      return;
    }

    setTimeout(typeText, 90);
  } else {
    typingText.innerHTML = currentText.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(typeText, 300);
      return;
    }

    setTimeout(typeText, 50);
  }
};

typeText();

// show loader
const showLoader = () => {
  loader.style.display = "flex";
};

// hide loader
const hideLoader = () => {
  loader.style.display = "none";
};

searchInput.addEventListener("click", clearResult);
searchbtn.addEventListener("click", searchValue);
