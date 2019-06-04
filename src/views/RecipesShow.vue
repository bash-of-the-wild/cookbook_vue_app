<template>
  <div class="recipes-show">
    <h2>{{ recipe.title }}</h2>

    <h3>Prep Time: {{ recipe.formatted.prep_time }}</h3>
    <p>Ingredients: </p>
    <ul>
      <li v-for="ingredient in recipe.formatted.ingredients">{{ ingredient }}</li>
    </ul>

    <p>Directions: </p>
    <ol>
      <li v-for="direction in recipe.formatted.directions">{{ direction }}</li>
    </ol>

    <img v-bind:src="recipe.image_url">

  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      recipe: {
                id: "",
                title: "",
                prep_time: "",
                ingredients: "",
                directions: "",
                formatted: {
                             prep_time: "",
                             ingredients: [],
                             directions: [],
                             created_at: ""
                            }
              }
    };
  },
  created: function() {
    axios.get("/api/recipes/" + this.$route.params.id ).then(response => {
      this.recipe = response.data;
    });
  },
  methods: {}
};
</script>