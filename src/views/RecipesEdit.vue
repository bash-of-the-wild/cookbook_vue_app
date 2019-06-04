<template>
  <div class="recipes-edit">
    <h1>Edit Recipe</h1>

    <ul>
      <li v-for="error in errors">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="submit()">
      <div>
        Title: <input v-model="recipe.title">
      </div>

      <div>
        Prep Time: <input v-model="recipe.prep_time">
      </div>

      <div>
        Ingredients: <input v-model="recipe.ingredients">
      </div>

      <div>
        Directions: <input v-model="recipe.directions">
      </div>

      <div>
        Image URL: <input v-model="recipe.image_url">
      </div>

      <input type="submit" value="Update Recipe">
    </form>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      errors: [],
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
  methods: {
    submit: function() {
      var params = {
                     title: this.recipe.title,
                     prep_time: this.recipe.prep_time,
                     ingredients: this.recipe.ingredients,
                     directions: this.recipe.directions,
                     image_url: this.recipe.image_url
                    };

      axios.patch("/api/recipes/" + this.$route.params.id, params).then(response => {
        this.$router.push("/recipes/" + this.$route.params.id);
      });
    }
  }
};
</script>