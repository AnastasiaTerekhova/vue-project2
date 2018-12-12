<template>
  <div>
    <div class="grid">
      <div v-for="post in paginatedData">

        <div class="grid-item1">
        <p>
          <router-link :to="{name:'post',params:{id:post.id-1}}">
            {{ post.title }}
          </router-link>
        </p>
        </div>

        <div class="grid-item">
        <img class="image" 
             v-bind:src="'https://picsum.photos/265/165?image=1'+parseInt(post.id-1)">
        </div>

    </div>
  </div>
    <button class="pagenate" :disabled="pageNumber === 0" @click="prevPage"> 
        Назад 
      </button>
      <button :disabled="pageNumber >= pageCount -1" @click="nextPage" class="pagenate">
        Вперед 
      </button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      posts: [],
      pageNumber:0
    }
  }, 
  mounted(){
    var self = this;
    axios.get('https://jsonplaceholder.typicode.com/posts')

    .then(function(res){
      self.posts = res.data;
      console.log('Data: ', res.data);
    })
    .catch(function(error){
      console.log('Error:', error);
    })
  },

props: {
        size: {
            type: Number,
            required: false,
            default: 16
        }
    },
    methods: {
        nextPage: function () {
            this.pageNumber++;
        },
        prevPage: function () {
            this.pageNumber--;
        }},
    computed: {
        pageCount() {
            var l = this.posts.length,
              s = this.size;
            if (l%s==0)
            return Math.floor(l/s)-1;
              else
            return Math.floor(l/s);
  },
        paginatedData: function () {
            var start = this.pageNumber * this.size,
                end = start + this.size;
            return this.posts.slice(start, end);
        }
      },
}
</script>

<style scoped>

.grid{
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.grid-item{
  height: 200px;
  width: 300px;
  border-bottom: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000; 
  margin: 0 10px 20px;
  flex: 1 1 calc(33.33% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid-item1{
  height: 130px;
  width: 300px;
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  margin: 0 10px 5px;
  flex: 1 1 calc(33.33% - 20px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 5px -5px #333;
}
button {
  position: relative;
  display: inline-block;
  width: 10em;
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
button:hover:disabled {
    cursor: not-allowed;
}
  .image{
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
  .post{
    background: #ccc;
    margin-bottom: 20px;
    padding: 10px 20px;
  }

	p{
    font-family: 'Exo 2', sans-serif;
    text-transform: uppercase; 
  }
</style>