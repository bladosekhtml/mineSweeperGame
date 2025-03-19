<template>
   <div class="timer">
      <h1>Время: {{ time }}</h1>
      <h1>Осталось полей: {{ value }}</h1>
   </div>
   <div class="game-board" v-if="gameIsStart === true || gameIsStart === 'true'">
      <div v-for="(row, rowIndex) in board" :key = 'rowIndex' class = "row">
         <div v-for="(col, colIndex) in row" :key = 'colIndex'
            class = 'col' :class="`${col.show} ${col.flag ? 'flag' : ''}`" @click = "openField(rowIndex, colIndex, col.status, col.flag)"
            :style="{ width: `${colWidth}px`, height: `${colWidth}px`}"
            @contextmenu = "changeFlag($event, rowIndex, colIndex)">
               <h1 v-if="col.show && col.status !== 'mined'" :class="`mines-${col.mines}`">{{ col.mines !== 0 ? col.mines : '' }}</h1>
               <img class = 'bomb' src="../../public/bomb-svgrepo-com.svg" alt="Бомба" v-if ="col.show && col.status === 'mined'">
               <img class = 'flag' src="../../public/flag-svgrepo-com.svg" alt="Флаг" v-if ="!col.show && col.flag">
         </div>
      </div>
   </div>
</template>

<script>
import { generateBoard, openFieldFunction } from '../../game/gameLogic';
import { useRecordStore } from '../stores/records';
import { ref, onMounted } from 'vue';

export default {
   props: ['field', 'mines'],

   data() {
      return {
         board: [],
         step: 0,
         gameIsStart: localStorage.getItem('gameIsStart'),
         fieldSize: JSON.parse(localStorage.getItem('fieldSize')),
         mines: parseInt(localStorage.getItem('mines')),
         time: 0,
         timer: null,
         value: 0,
         colWidth: 0,
         game: true
      }
   }, 
   
   created() {
      this.createBoard();
      this.handleResize();
   },

   mounted() {
      window.addEventListener('resize', this.handleResize);
   },

   methods: {
      createBoard() {
         const { mines, fieldSize } = this;

         const fieldName = ['empty', 'mined'];

         this.board = Array.from({length: fieldSize[1]}, () => 
            Array.from({ length: fieldSize[0] }, () => ({ 
               status: fieldName[0], 
               show: false, 
               mines: 0,
               flag: false
            })));

         this.handleResize();
      }, 

      openField(rowIndex, colIndex, colStatus, colFlag) {
         if (this.step === 0) {
            this.board = generateBoard(this.board, this.mines, rowIndex, colIndex);
            this.value = this.board.flat().filter(val => !val.show && val.status !== 'mined').length;
            this.startTimer();
         } else if (colStatus === 'mined' && !colFlag) {
            this.game = false;
         } else if (!colFlag){
            this.board = openFieldFunction(this.board, rowIndex, colIndex).field;
            this.value = this.board.flat().filter(val => !val.show && val.status !== 'mined').length;
         }
         if (this.value === 0 || this.game === false) {
            clearInterval(this.timer);

            this.board = this.board.map(row => row.map(col => ({
               ...col,
               show: true
            })));

            this.timer = null;

            if (this.game) {
               this.endGame('Выигрыш');
            } else {
               this.endGame('Проигрыш');
            }
            return;
         }
         this.step++;
      },
      
      startTimer() {
         this.timer = setInterval(() => {
            this.time++;
         }, 1000);
      },

      changeFlag(e, row, col) {
         e.preventDefault();
         this.board[row][col].flag = !this.board[row][col].flag;
      },

      handleResize() {

         const colWidthFromWidth = window.innerWidth * 0.7 / this.fieldSize[0];
         const colWidthFromHeight = window.innerHeight * 0.7 / this.fieldSize[1];

         this.colWidth = Math.min(colWidthFromWidth, colWidthFromHeight);
      },

      endGame(result) {
         const recordStore = useRecordStore();

         const gameRecord = {
            date: new Date().toLocaleString(),
            time: this.time,
            fieldSize: `${this.fieldSize[0]}x${this.fieldSize[1]}`,
            mines: this.mines,
            result
         };

         recordStore.addRecord(gameRecord);
      }
   }
}
</script>

<style scoped>
.col {
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   border: 1px solid black;
   background-color: grey;
}

.col.true {
   background: rgb(247, 255, 140) !important;
   cursor: auto !important;
}
.row {
   display: flex;
}

h1 {
   text-align: center;
   font-size: calc(min(2vw, 3vh));
}

.bomb, .flag {
   width: 70%;
   height: 70%;
   cursor: auto;
}

.timer {
   position: absolute;
   display: flex;
   gap: 10px;
   left: 50vw;
   top: 6vh;
   transform: translateX(-50%);
   color: white;
}

.timer h1 {
   font-size: calc(min(2vw, 3vh));
}

.mines-1 {
   color: rgb(84, 84, 255);
}
.mines-2 {
   color: rgb(0, 255, 0);
}
.mines-3 {
   color: red;
}
.mines-4 {
   color: rgb(0, 0, 212);
}
.mines-5 {
   color: brown;
}
.mines-6 {
   color: #48d1cc;
}
.mines-7 {
   color: rgb(0, 0, 0);
}
.mines-8 {
   color: rgb(255, 255, 255);
}
</style>