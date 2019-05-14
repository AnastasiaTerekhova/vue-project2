<template>
    <div class="container" id="open" v-if = "posts[postId]">
      <h2>{{posts[postId].title}}</h2>
      <p>{{posts[postId].body}}</p>

      <div class="block-first">
        <dir class="dbl-border">
      <img class="image" v-bind:src="'https://picsum.photos/550/380?image=1' +postId">
        </dir>
      </div>

      <div class="container-bottom">
      
        <div v-if = "comments[postId]">
          <h3>Комментарии :</h3>
          <p style="font-weight:bold; color: #38697f">{{comments[postId].name}}</p> 
          <sup>{{comments[postId].email}}</sup>
          <p>{{comments[postId].body}}</p>
        </div>

        <div class="block-item">
      
              <button v-if="!favorites[postId]" @click="addToFavorite()">
                Добавить в избранное
              </button>
              <button v-if="favorites[postId]" @click="removeFromFavorite(postId)">
                Удалить из избранного
              </button>
      </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
      comments:[],
      postId: this.$route.params.id,
      favorites: []
    }
  }, 
  mounted(){
    if (localStorage.favorites) {
            this.favorites = JSON.parse(localStorage.getItem('favorites'));
        }
    var self = this;
    axios.get("'https://jsonplaceholder.typicode.com/posts/' +this.postId")
    .then(function(res){
      self.posts = res.data;
      console.log('Data: ', res.data);
    })
    .catch(function(error){
      console.log('Error:', error);
    })
 
    axios.get('https://jsonplaceholder.typicode.com/comments')
    .then(function(res){
      self.comments = res.data;
      console.log('Data: ', res.data);
    })
    .catch(function(error){
      console.log('Error:', error);
    })
  },
  methods:{
        addToFavorite: function () {
            this.favorites[this.postId] = {
                data: this.posts[this.postId],
                image:"https://picsum.photos/300/250?image=1" +this.postId,
                comment: this.comments[this.postId],
            };
            this.saveFavorite();
            this.favorites = JSON.parse(localStorage.getItem('favorites'));
            console.log(this.favorites);
        },
        removeFromFavorite: function (x) {
            this.favorites.splice(x, 1, null);
            this.saveFavorite();
        },
        saveFavorite: function () {
            const parsed = JSON.stringify(this.favorites);
            localStorage.setItem('favorites', parsed);
        }
  }
}
</script>

<style scoped>

  .container{
    width: 100%;
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
  }
  .block-first{
    min-width: 960px;
    font-size: 15px;
    flex: auto;
    display: flex;
    justify-content: center;
  }
  .container-bottom{
    margin-left: 30px;
    display: flex;
    flex: 0 0 960px;
    flex-direction: column-reverse;
  }
  .block-item{
    margin-top: 10px;
    border-top: 1px solid #edc2e6;
    border-bottom: 1px solid #edc2e6;
    padding: 20px 20px;
    text-align: center;
  }
  h2{ 
    color: #14050a;
    font-family: 'Exo 2', sans-serif;
    text-transform: uppercase; 
  }
    h3{
    color: #14050a;
    text-align: center;
    font-family: 'Exo 2', sans-serif;
    text-transform: uppercase;
  }
  p{
    font-family: 'Exo 2', sans-serif;
  }
  .image{
    box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.1);
  }
  button {
  position: relative;
  display: inline-block;
  width: 15em;
  height: 2.5em;
  line-height: 2.5em;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  color: #000;
  outline: none;
  box-shadow: 0 0 0 60px rgba(0,0,0,0) inset, .1em .1em .2em #000;
  background: linear-gradient(to top left, powderblue, pink);
  }
  button:active {
    top: .1em;
    left: .1em;
    box-shadow: 0 0 0 60px rgba(0,0,0,.05) inset;
  }
</style>