import { createRouter, createWebHashHistory } from 'vue-router';
import MainMenu from '../components/MainMenu.vue';
import GameBoard from '../components/GameBoard.vue';
import HistoryGame from '@/components/HistoryGame.vue';

const routes = [
   {  path: '/', 
      component: MainMenu },
   {
      path: '/history',
      component: HistoryGame
   },
   {  path: '/game', 
      component: GameBoard,
      props: route => {
         const fieldSize = JSON.parse(route.query.fieldSize || '[8, 8]').map(value => parseInt(value));
         const mines = parseInt(route.query.mines) || 10;
         return {
            fieldSize,
            mines
         };
      }
   }
];

const router = createRouter({
   history: createWebHashHistory(),
   routes
});

export default router;