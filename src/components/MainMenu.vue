<style scoped>
   .main-menu > button, .modal {
      position: absolute;
      top: 50vh;
      left: 50vw;
      transform: translate(-50%, -50%);
   }
   .modal {
      background-color: hsla(160, 100%, 37%, 1);
      z-index: 1;
      box-shadow: 0 0 3px 1px rgb(255, 255, 255);
   }
   .modal ul, .modal li, .modal button {
      width: 100%;
   }
   ul {
      padding: 2vh 5vw;
   }
   ul, li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 100%;
   }
   li > button {
      color: hsla(160, 100%, 37%, 1);
      background-color: #181818;
   }
   form {
      display: flex;
      flex-direction: column;
      gap: 5px;
   }
   label {
      display: flex;
      flex-direction: column;
      align-items: center;
   }
   input {
      background-color: #00000063;
      color: hsla(160, 100%, 37%, 1);
      padding: 10px 30px;
      text-align: center;
      font-size: 16px;
   }
</style>
<template>
   <div class="main-menu">
   <button v-if="!showModal" @click="showModal = true">Играть</button>

      <!-- Модальное окно с выбором -->
      <div v-if="showModal && !showSelectModal" class = "modal" 
         @blur="showModal = false">
         <h3>ВЫБЕРИТЕ СЛОЖНОСТЬ</h3>
         <ul>
            <li><button @click="gameStart($event, 'easy')">Легкая</button></li>
            <li><button @click="gameStart($event, 'normal')">Нормальная</button></li>
            <li><button @click="gameStart($event, 'hard')">Сложная</button></li>
            <li><button @click="showSelectModal = true;">Custom</button></li>
            <li><button class = "close" @click = "showModal = false">Закрыть</button></li>
         </ul>
      </div>
      <div v-if="showSelectModal" class = "modal">
         <h3>СОСТАВЬТЕ УРОВЕНЬ</h3>
         <form>
            <p class = 'error' v-if = "customModalError">{{ customModalErrorText }}</p>
            <label><h3>ДЛИНА ПОЛЯ:</h3> <input type="number" @input="numberFormated('gameFieldsLength')" id = 'gameFieldsLength' 
               placeholder="Кол-во полей" value = '4' required></label>
            <label><h3>ШИРИНА ПОЛЯ:</h3> <input type="number" @input="numberFormated('gameFieldsWidth')" id = 'gameFieldsWidth' 
               placeholder="Кол-во полей" value = '4' required></label>
            <label><h3>КОЛИЧЕСТВО МИН:</h3> <input type="number" @input="numberFormated('gameMines')" id = 'gameMines' 
               placeholder="Кол-во мин" value = '1' required></label>
            <button @click="customGameStart($event);">СОЗДАТЬ</button>
            <button class = "close" @click = "showSelectModal = false">Закрыть</button>
         </form>
      </div>
   </div>
</template>
<script>
   export default {
      data() {
         return {
            showModal: false,
            modalError: false,
            modalErrorText: '',
            showSelectModal: false,
            customModalError: false,
            customModalErrorText: ''
         }
      },
      methods: {
         closeModal() {
            this.showModal = false;
         },
         gameStart(e, type) {
            try {
               e.preventDefault();
               let fieldSize = [8, 8];
               let mines = 10;
               switch(type) {
                  case 'easy': 
                     break;
                  case 'normal':
                     fieldSize = [16, 16];
                     mines = 40;
                     break;
                  case 'hard':
                     fieldSize = [32, 16];
                     mines = 100;
                     break;
                  default:
                     this.modalError = true;
                     this.modalErrorText = 'Режим не найден';
                     throw 'Режим не найден';
               }
               this.showModal = false;
               this.customModalError = false;

               localStorage.setItem('fieldSize', JSON.stringify(fieldSize));
               localStorage.setItem('mines', mines);
               localStorage.setItem('gameIsStart', true);

               this.$router.push({ path: '/game'});
            } catch(err) {
               console.error(err);
            }
         },
         customGameStart(e) {
            e.preventDefault();
            try {
               const fieldWidth = parseInt(document.getElementById('gameFieldsWidth').value);
               const fieldLength = parseInt(document.getElementById('gameFieldsLength').value);
               const mines = parseInt(document.getElementById('gameMines').value);
               if (fieldWidth < 4 || fieldLength < 4 || mines < 1) {
                  this.customModalError = true;
                  this.customModalErrorText = "Введены не корректные данные";
                  throw "Введены не корректные данные";
               } else if (fieldWidth * fieldLength - mines < 9) {
                  this.customModalError = true;
                  this.customModalErrorText = "Количество полей должно быть больше мин минимум на 9";
                  throw "Количество полей должно быть больше мин минимум на 9";
               }
               this.customModalError = false;
               this.customModalErrorText = "";
               
               localStorage.setItem('fieldSize', JSON.stringify([fieldLength, fieldWidth]));
               localStorage.setItem('mines', mines);
               localStorage.setItem('gameIsStart', true);

               this.$router.push({ path: '/game'});
            } catch(err) {
               console.error(err);
            }
         },
         numberFormated(field) {
            const input = document.getElementById(field);
            const value = input.value;
            switch (field) {
               case 'gameFieldsLength':
                  if (value < 4) {
                     input.value = 4;
                  } else {
                     input.value = parseInt(value);
                  }
                  break;

               case 'gameFieldsWidth':
                  if (value < 4) {
                     input.value = 4;
                  } else {
                     input.value = parseInt(value);
                  }
                  break;

               case 'gameMines':
                  if (value < 1) {
                     input.value = 1;
                  } else {
                     input.value = parseInt(value);
                  }
                  break;

               default:
                  throw "Поле не найдено";
            }
         }
      },
   };
</script>