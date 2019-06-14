<template>
  <div class="recipes-index">
    <div class="container">
      <h1>All Recipes</h1>
      <div>
        Search by Title: <input v-model="titleFilter">
      </div>

      <div>
        <button class="btn btn-dark m-1" v-on:click="setSortAttribute('title')">
          {{ isAscending('title') }} 
          Sort by Title
        </button>
        <button class="btn btn-dark m-1" v-on:click="setSortAttribute('prep_time')">
          <span v-if="sortAttribute === 'prep_time' && sortAscending === 1 ">^</span> 
          <span v-else-if="sortAttribute === 'prep_time' && sortAscending === -1 ">v</span> 
          Sort by Prep Time
        </button>
      </div>

      <transition-group appear enter-active-class="animated bounceInDown" leave-active-class="animated bounceOut" class="row mt-5">
        <div class="col-sm-4" v-for="recipe in orderBy(filterBy(recipes, titleFilter, 'title'), sortAttribute, sortAscending)" v-bind:key="recipe.id">
          <img class="index-recipes-img" v-bind:src="recipe.image_url" v-bind:alt="recipe.title">
          <h2><router-link v-bind:to="'/recipes/' + recipe.id">{{ recipe.title }}</router-link></h2>
          <p>{{recipe.prep_time}}</p>
        </div>
      </transition-group>
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
      recipes: [],
      titleFilter: "",
      sortAttribute: "title",
      sortAscending: 1
    };
  },
  created: function() {
    axios.get("/api/recipes").then(response => {
      this.recipes = response.data;
    });
  },
  methods: {
    setSortAttribute: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        this.sortAscending *= -1;
      } else {
        this.sortAscending = 1;
      }

      this.sortAttribute = inputAttribute;
    },
    isAscending: function(inputAttribute) {
      if (this.sortAttribute === inputAttribute) {
        return this.sortAscending === 1 ? "^" : "v";
      }
    }
  },
  mixins: [Vue2Filters.mixin]
};
</script>