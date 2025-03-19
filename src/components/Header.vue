<template>
   <header>
      <nav>
         <ul>
            <li><h3><router-link to="/">МЕНЮ</router-link></h3></li>
            <li><h3><router-link to="/history">ИСТОРИЯ</router-link></h3></li>
         </ul>
      </nav>
   </header>
</template>

<style scoped>
   header {
      background-color: hsla(160, 100%, 37%, 1);
      padding: .5rem 2rem;
      height: 5vh;
   }
   ul {
      display: flex;
      justify-content: center;
      gap: 1%;
   }
   a {
      font-size: 18px !important;
   }
</style>