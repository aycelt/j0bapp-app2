<template>
    <div class="jam">
      <div class="shower" @click="showCompletedJobs">Show Completed</div>
      <div class="shower" @click="showAllJobs">Show All</div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['jobs'],
    methods: {
      showCompletedJobs() {
        this.$emit('filter', 'completed');
      },
      showAllJobs() {
        this.$emit('filter', 'all');
      }
    }
  }
  </script>
  
  
  <style>
  .shower {
    height: 20px;
    width: 140px;
    border-radius: 15px;
    background: hsl(180, 29%, 50%);
    align-items: center;
    margin: 0 5px 10px 5px;
    color: white;
    cursor: pointer;
  }
  .jam {
    display: flex;
    justify-content: space-between;
  }
  </style>
  