<template>
  <div class="home">
    <h1>New Recipe</h1>
    <div>
      Title: <input v-model="newRecipeTitle">
    </div>

    <div>
      Prep Time: <input v-model="newRecipePrepTime">
    </div>

    <div>
      Ingredients: <input v-model="newRecipeIngredients">
    </div>

    <div>
      Directions: <input v-model="newRecipeDirections">
    </div>

    <div>
      Image URL: <input v-model="newRecipeImageUrl">
    </div>

    <button v-on:click="createRecipe()">Create</button>

    <h1>All Recipes</h1>

    <div v-for="recipe in recipes">
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
      <h2>Title: {{ recipe.title }}</h2>
      <div v-if="currentRecipe === recipe">
        <h3>Prep Time: recipe.formatted.prep_time</h3>
        <p>Ingredients: </p>
        <ul>
          <li v-for="ingredient in recipe.formatted.ingredients">{{ ingredient }}</li>
        </ul>
        <p>Directions: </p>
        <ol>
          <li v-for="direction in recipe.formatted.directions">{{ direction }}</li>
        </ol>
      </div>
      <button v-on:click="currentRecipe = recipe">More Info</button>
    </div>
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      recipes: [],
      newRecipeTitle: "",
      newRecipePrepTime: "",
      newRecipeIngredients: "",
      newRecipeDirections: "",
      newRecipeImageUrl: "",
      currentRecipe: {
                      title: "",
                      prep_time: "",
                      directions: "",
                      ingredients: "",
                      image_url: "",
                      formatted: {
                                  created_at: "",
                                  ingredients: [],
                                  directions: [],
                                  prep_time: ""
                                  }
                      }
    };
  },
  created: function() {
    // web request to api
    axios.get("/api/recipes").then(response => {
      this.recipes = response.data;
    });
  },
  methods: {
    createRecipe: function() {
      console.log("Create the recipe...");

      var params = {
                     title: this.newRecipeTitle,
                     prep_time: this.newRecipePrepTime,
                     ingredients: this.newRecipeIngredients,
                     directions: this.newRecipeDirections,
                     image_url: this.newRecipeImageUrl
                    };

      axios.post("/api/recipes", params).then(response => {
        console.log("Success", response.data);
        this.recipes.push(response.data);

        this.newRecipeTitle = "";
        this.newRecipePrepTime = "";
        this.newRecipeIngredients = "";
        this.newRecipeDirections = "";
        this.newRecipeImageUrl = "";
      });
    }
  }
};
</script>