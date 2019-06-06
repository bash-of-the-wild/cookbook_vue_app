<template>
  <div class="recipes-table-index">
    <div class="container">
      <h1>All Recipes</h1>
      <div>
        Search by Title: <input v-model="titleFilter">
      </div>


      <table class="table table-striped table-light">
        <thead class="thead-dark">
          <tr>
            <th v-on:click="setSortAttribute('id')" scope="col">{{ isAscending('id') }} Id</th>
            <th v-on:click="setSortAttribute('title')" scope="col">{{ isAscending('title') }} Title</th>
            <th v-on:click="setSortAttribute('prep_time')" scope="col">{{ isAscending('prep_time') }} Prep Time</th>
            <th v-on:click="setSortAttribute('ingredients')" scope="col">{{ isAscending('ingredients') }} Ingredients</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in orderBy(filterBy(recipes, titleFilter, 'title'), sortAttribute, sortAscending)">
            <th scope="row">{{ recipe.id }}</th>
            <td>{{ recipe.title }}</td>
            <td>{{ recipe.formatted.prep_time }}</td>
            <td>{{ recipe.ingredients }}</td>
          </tr>
        </tbody>
      </table>
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