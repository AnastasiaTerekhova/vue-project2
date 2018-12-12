<template>
    <div id="favo">
    <div class="grid">
    <div  v-for="favorite in paginatedData">

      <div class="grid-item1">
      <p><router-link :to="{name:'post',params:{id:favorite.data['id']-1}}">
        {{favorite.data['title']}}
      </router-link></p>
      </div>

      <div class="grid-item">
      <img class="image" 
           v-bind:src="'https://picsum.photos/265/165?image=1'+parseInt(favorite.data['id']-1)">
      </div>
    </div> 
    </div>

        <div v-if="paginatedData==0"><h4>Добавьте статьи в избранное</h4></div>

        <button :disabled="pageNumber === 0" @click="prevPage">
          Назад 
        </button>
        <button :disabled="pageNumber >= pageCount -1" @click="nextPage"> 
          Вперед 
        </button>     
    </div>
</template>

<script>
export default {
  data () {
    return {
      pageNumber: 0,
      favorites: []
    }
  },
  props: {
        size: {
            type: Number,
            required: false,
            default: 12
        }
    },
  methods: {
        nextPage: function () {
            this.pageNumber++;
        },
        prevPage: function () {
            this.pageNumber--;
        },
        clear: function () {
            var favorite = JSON.parse(localStorage.getItem('favorites'));
            var buff = [];
            for (var i = 0; i < 100; i++) {
                if (favorite[i] != null) {
                    buff.push(favorite[i]);
                }
            }
            this.favorites = buff;
        }
    },
        created: function () {
            if (localStorage.favorites) {
                this.clear()
            } else {
                const parsed = JSON.stringify(this.favorites);
                localStorage.setItem('favorites', parsed);
            }
        },
        computed: {
            pageCount: function () {
                var l = this.favorites.length,
                    s = this.size;
                if (l%s==0)
            return Math.floor(l/s)-1;
              else
            return Math.floor(l/s);
            },
            paginatedData: function () {
                var start = this.pageNumber * this.size,
                    end = start + this.size;
                return this.favorites.slice(start, end);
            }
        }
}
</script>

<style scoped>
	
	h2{color: #0d040b;}
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
    border-bottom: 1px solid #15324a;
    border-left: 1px solid #15324a;
    border-right: 1px solid #15324a; 
    margin: 0 10px 20px;
    flex: 1 1 calc(33.33% - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .grid-item1{
    height: 130px;
    width: 300px;
    border-top: 1px solid #15324a;
    border-left: 1px solid #15324a;
    border-right: 1px solid #15324a;
    margin: 0 10px 5px;
    flex: 1 1 calc(33.33% - 20px);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 5px -5px #15324a;
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

  p{
    font-family: 'Exo 2', sans-serif;
    text-transform: uppercase; 
  }
</style>