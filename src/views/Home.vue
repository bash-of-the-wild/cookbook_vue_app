<template>
  <div class="home">
    <h1>All Recipes</h1>

<!--     <% @recipes.each do |recipe| %>
            <h2>Title: <%= recipe.title %></h2>
            <p>Ingredients: <%= recipe.ingredients %></p>
            <p>Directions: <%= recipe.directions %></p>
          <% end %> -->

    <div v-for="recipe in recipes">
      <h2>Title: {{ recipe.title }}</h2>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
    </div>
  </div>
</template>

<style>
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
    // web request to api
    axios.get("http://localhost:3000/api/recipes").then(response => {
      this.recipes = response.data;
    });
  },
  methods: {}
};
</script>