<template>
  <div class="week">
      <a @click="doStuff" class="waves-effect waves-light btn">Pick Week {{ currentWeek }}</a>
  </div>
</template>
<script>
import { db } from '../firebase';

export default {
    name: 'week',
    firebase () {
        return {
            currentWeek: db.ref('schedule/current')
        }
    },
    methods: {
        doStuff: function () {
            
            console.log('done');
        }
    }
    
};
</script>
