document.addEventListener("DOMContentLoaded", function () {
    let btn_about = document.querySelector("#about");
    let btn_create = document.querySelector("#create");
    let recipies_container = document.querySelector(".recipies-container");
    let create_form = document.querySelector(".create-form");
    let view_recipe_form = document.querySelector(".view-recipe");
    let btn_view_menu = document.querySelector("#view_menu");

    const recipeForm = document.getElementById("Addrecipe");
    const recipeList = document.getElementById("recipeList");
    const recipeTitle = document.getElementById("recipeTitle");
    const recipeImage = document.getElementById("recipeImage");
    const recipeIngredients = document.getElementById("recipeIngredients");
    const recipeInstructions = document.getElementById("recipeInstructions");

    btn_about.addEventListener("click", function () {
        recipies_container.style.display = "flex";
        view_recipe_form.style.display = "flex";
        create_form.style.display = "none";
    });

    btn_create.addEventListener("click", function () {
        recipies_container.style.display = "none";
        view_recipe_form.style.display = "none";
        create_form.style.display = "flex";
    });

    btn_view_menu.addEventListener('click', function () {
        recipies_container.style.display = "none";
        view_recipe_form.style.display = "flex";
        create_form.style.display = "none";
    })

    
    function getRecipes() {
        return JSON.parse(localStorage.getItem("recipes")) || [];
    }

    function saveRecipes(recipes) {
        localStorage.setItem("recipes", JSON.stringify(recipes));
    }

    function displayRecipes() {
        recipeList.innerHTML = "";
        const recipes = getRecipes();
        recipes.forEach((recipe, index) => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "recipe-card";
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                <h3>${recipe.title}</h3>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;
    
            recipeCard.addEventListener("click", () => viewRecipe(index));
    
            recipeList.appendChild(recipeCard);
        });
    
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (event) => {
                event.stopPropagation();
                const index = event.target.dataset.index;
                deleteRecipe(index);
            });
        });
    }

    function deleteRecipe(index) {
        let recipes = getRecipes();
        recipes.splice(index, 1); 
        saveRecipes(recipes); 
        displayRecipes(); 
    }

    function viewRecipe(index) {
        const recipes = getRecipes();
        const recipe = recipes[index];
        recipeTitle.textContent = recipe.title;
        recipeImage.src = recipe.image;
        recipeIngredients.textContent = recipe.ingredients;
        recipeInstructions.textContent = recipe.instructions;
        // showSection("viewRecipes");
    }

    recipeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const title = document.getElementById("title").value;
        const ingredients = document.getElementById("ingredients").value;
        const instructions = document.getElementById("recipe").value;
        const imageInput = document.getElementById("image").files[0];

        if (imageInput) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newRecipe = { title, ingredients, instructions, image: e.target.result };
                const recipes = getRecipes();
                recipes.push(newRecipe);
                saveRecipes(recipes);
                displayRecipes();
                // showSection("home");
                recipeForm.reset();
            };
            reader.readAsDataURL(imageInput);
        }
    });

    displayRecipes();
});