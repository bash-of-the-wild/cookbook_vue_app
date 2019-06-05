<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>

    <div v-for="recipe in recipes">
      <img class="index-recipes-img" v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
      <h2><router-link v-bind:to="'/recipes/' + recipe.id">{{ recipe.title }}</router-link></h2>
    </div>
  </div>
</template>

<style>
img.index-recipes-img {
  width: 250px;
}
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("/api/recipes").then(response => {
      this.recipes = response.data;
    });
  },
  methods: {}
};
</script>