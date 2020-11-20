<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="header">Welcome to Name,Place,Animal,Thing Game</router-link>
      <!--<router-link to="/about" class="header">about</router-link>-->
    </div>
    <router-view/>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  font-family: cursive;
  color: #2c3e50;
  max-width: 1024px;
  margin:0 auto;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.header {
  font-size: 1.5em;
}
body {
  background: url('./assets/background_img.jpg');
}
</style>
