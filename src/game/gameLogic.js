export function openFieldFunction(board, row, col) {
   if (row < 0 || col < 0 || row >= board.length || col >= board[0].length) {
      return { success: false, field: board };
   }

   if (board[row][col].show) {
      return { success: false, field: board };
   }

   board[row][col].show = true;

   if (board[row][col].status === 'mined') {
      return { success: false, field: board };
   }

   let copyBoard = [...board];

   if (board[row][col].mines === 0) {
      const directions = [
         [-1, -1], [-1, 0], [-1, 1],
         [0, -1], [0, 1],
         [1, -1], [1, 0], [1, 1]
      ];

      for (const [dx, dy] of directions) {
         const newRow = row + dx;
         const newCol = col + dy;
         if (
            newRow >= 0 && newRow < board.length &&
            newCol >= 0 && newCol < board[0].length &&
            !board[newRow][newCol].show
         ) {
            copyBoard = openFieldFunction(copyBoard, newRow, newCol).field;
         }
      }

      return { success: true, field: copyBoard };

   }

   return { success: true, field: board };
}

export function generateBoard(field, mines, row, col) {
   const rows = field.length;
   const cols = field[0].length;
   const fieldMines = new Set();

   while (fieldMines.size < mines) {
      const mineRow = Math.floor(Math.random() * rows);
      const mineCol = Math.floor(Math.random() * cols);

      if (!fieldMines.has(`${mineRow},${mineCol}`) && (Math.abs(row - mineRow) > 1 || Math.abs(col - mineCol) > 1) && (col != mineCol || row != mineRow)) {

         fieldMines.add(`${mineRow},${mineCol}`);
         field[mineRow][mineCol].status = 'mined';

         for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
               if (!(i === 0 && j === 0) && mineRow + i > -1 && mineRow + i < rows && mineCol + j > -1 && mineCol + j < cols) {
                  field[mineRow + i][mineCol + j].mines++;
               };
            };
         };
      }
   };

   openFieldFunction(field, row, col);
   return field;;
};