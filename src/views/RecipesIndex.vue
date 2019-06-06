<template>
  <div class="recipes-index">
    <div class="container">
      <h1>All Recipes</h1>
      <div>
        Search by Title: <input v-model="$parent.titleFilter">
      </div>

      <div class="row mt-5">
        <div class="col-md-4" v-for="recipe in filterBy(recipes, $parent.titleFilter, 'title')">
          <img class="index-recipes-img" v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
          <h2><router-link v-bind:to="'/recipes/' + recipe.id">{{ recipe.title }}</router-link></h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img.index-recipes-img {
  width: 250px;
}
</style>

<script>
import Vue2Filters from 'vue2-filters';
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
  methods: {},
  mixins: [Vue2Filters.mixin]
};
</script>