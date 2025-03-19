import { defineStore } from 'pinia';

export const useRecordStore = defineStore('recordStore', {
   state: () => ({
      records: JSON.parse(localStorage.getItem('records')) || []
   }),
   actions: {
      addRecord(record) {
         this.records.push(record);
         this.saveRecords();
      },

      saveRecords() {
         localStorage.setItem('records', JSON.stringify(this.records));
      }
   },
   getters: {
      getRecords: (state) => state.records
   }
});