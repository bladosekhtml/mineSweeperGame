<template>
   <div class = 'table'>
      <h1>История игр</h1>
      <table>
         <thead>
            <tr>
               <th>Дата</th>
               <th>Время</th>
               <th>Размер поля</th>
               <th>Кол-во мин</th>
               <th>Результат</th>
            </tr>
         </thead>
            <tr v-for="(record, index) in records" :key="index">
               <td>{{ record.date }}</td>
               <td>{{ record.time }}</td>
               <td>{{ record.fieldSize }}</td>
               <td>{{ record.mines }}</td>
               <td>{{ record.result }}</td>
            </tr>
         <tbody>
         </tbody>
      </table>
   </div>
</template>
<style scoped>
.table {
   display: flex;
   flex-direction: column;
   align-items: center;
   text-align: center;
}
table, tr {
   border-collapse: collapse;
}
td, th{
   border: 1px solid white;
   padding: 5px;
}
</style>
<script>
import { useRecordStore } from '../stores/records';
import { ref, onMounted } from 'vue';

export default {
   setup() {
      const records = ref([]);

      onMounted(() => {
         const recordStore = useRecordStore();
         records.value = recordStore.getRecords;
      });

      return { records };
   }
}
</script>