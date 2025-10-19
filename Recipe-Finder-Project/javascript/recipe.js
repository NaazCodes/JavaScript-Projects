const recipeName = document.getElementById("recipe-name");
const recipeImage = document.getElementById("recipe-image");
const ingredients = document.getElementById("ingredients");
const instructions = document.getElementById("instructions");
const instructionsHead = document.getElementById("instructions-heading");
const ingredientsHead = document.getElementById("ingredients-heading");
const ytVideo = document.getElementById("video-container");
const videoHead = document.getElementById("video-heading");

const loader = document.getElementById("loader");

const showLoader = () => {
  loader.style.display = "flex";
};

const hideLoader = () => {
  loader.style.display = "none";
};

 
const params = new URLSearchParams(window.location.search);
console.log(params);
const recipeId = params.get("id");
console.log(recipeId);

const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
showLoader();
fetch(url)
  .then((Response) => Response.json())
  .then((data) => {
    console.log(data);
    hideLoader();
    document.title = `Recipe- ${data.meals[0].strMeal}`;
    
    recipeName.textContent = data.meals[0].strMeal;
    recipeImage.src = data.meals[0].strMealThumb;
    recipeImage.alt = data.meals[0].strMeal;

     ingredientsHead.textContent = "Ingredients";
    for (let i = 1; i <= 20; i++) {
      const ingredient = data.meals[0][`strIngredient${i}`];
      const measure = data.meals[0][`strMeasure${i}`];
      if(!ingredient){
        break;
      }
      ingredients.innerHTML += `${ingredient} <div class="separator">------</div > ${measure} <br> `;
      
    }

    instructionsHead.textContent = "Instructions";
    instructions.textContent = data.meals[0].strInstructions;

   const videoUrl = data.meals[0].strYoutube;
   const videoId = videoUrl.split("v=")[1].split("&")[0];
   videoHead.textContent = "Watch Full Video";
   const embedUrl = `https://www.youtube.com/embed/${videoId}`
   ytVideo.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allowfullscreen></iframe>`;
  });
  
