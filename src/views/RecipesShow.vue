<template>
  <div class="recipes-show">
    <div class="container">
      <div class="row">
        <div class="col-sm-6">
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

          <router-link class="btn btn-warning m-1" v-bind:to=" '/recipes/' + recipe.id + '/edit' ">Edit</router-link>
          <button class="btn btn-my-color m-1" v-on:click="destroyRecipe()">Delete</button>
          <router-link v-bind:to="'/recipes/' + (recipe.id + 1)" class="btn btn-success">Next</router-link>
        </div>
        <div class="col-sm-6">
          <img v-bind:src="recipe.image_url" class="img-fluid show-recipe-img">
        </div>
      </div> <!-- end of .row -->
    </div> <!-- end of .container -->

    

  </div>
</template>

<style>
img.show-recipe-img {
  width: 100%;
}

.btn-my-color {
  background-color: deeppink;
}
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
  methods: {
    destroyRecipe: function() {
      axios.delete("/api/recipes/" + this.recipe.id).then(response => {
        this.$router.push("/");
      });
    }
  },
  beforeRouteUpdate: function(to, from, next) {
    axios.get("/api/recipes/" + to.params.id ).then(response => {
      this.recipe = response.data;
    });

    next();
  }
};
</script>