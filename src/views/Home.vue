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
      <h2>Title: {{ recipe.title }}</h2>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
      <img v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
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
      newRecipeImageUrl: ""
    };
  },
  created: function() {
    // web request to api
    axios.get("http://localhost:3000/api/recipes").then(response => {
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

      axios.post("http://localhost:3000/api/recipes", params).then(response => {
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