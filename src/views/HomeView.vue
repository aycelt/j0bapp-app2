<template>
    <div class="header">
      <img src="../static-job-listings-master/static-job-listings-master/images/bg-header-desktop.svg" alt="">
    </div>

    <div class="selected-elements" >
      <span v-for="element in selectedElements" :key="element" class="selected-element">
        {{ element }} <span class="remove-icon" @click="removeElement(element)">X</span>
      </span>
      <button @click="filterJobs">Filter/Reload</button>
    </div>

    <filternav @filter="applyFilter" class="like" />

        <div v-if="loading">
            <!-- Show loading indicator or message -->
            <p>Loading...</p>
        </div>

        <div v-else>
      <div v-if="filteredJobs.length > 0">
        <div v-for="job in filteredJobs" :key="job.id">
          <singlejob :job="job" :addElementToBox="addElementToBox"/>
        </div>
      </div>
      <div v-else>
        <p>No jobs found.</p>
      </div>
  
  </div>
  

</template>

<script>
import singlejob from '../components/singlejob.vue'
import filternav from '../views/filternav.vue'


export default {
  name: 'HomeView',
  components: {singlejob, filternav},
  data(){
    return{
      jobs:[],
      loading: true,
      filter: null,
      selectedElements: [],
      originalJobs: [],
    }
  },
  mounted(){
    fetch('http://localhost:3000/jobs')
      .then(res => res.json())
      .then(data => {
              this.jobs = data;
              this.loading = false;
              this.originalJobs = [...data];
              console.log('Fetched Jobs:', this.jobs);})
              
      .catch(err => console.log(err.message))
  }
  ,
  computed: {
  filteredJobs() {
    if (!this.filter || this.filter === 'all') {
      // If no filter is applied or "Show All" is selected, return all jobs
      return this.jobs;
    } else if (this.filter === 'completed') {
      // Return completed jobs
      return this.jobs.filter(job => job.completed === true);
    } else {
      // Return non-completed jobs
      return this.jobs.filter(job => job.completed === false);
    }
  }
}
,

  methods: {
    applyFilter(filter) {
      // Update the filter state when the filter is applied from the FilterNav component
      this.filter = filter;

    }, // Method to add clicked element to the selectedElements array
    addElementToBox(element) {
      if (!this.selectedElements.includes(element)) {
        this.selectedElements.push(element);
      }
    },

    // Method to remove an element from the selectedElements array
    removeElement(element) {
      this.selectedElements = this.selectedElements.filter(el => el !== element);
    },
    filterJobs() {
  if (this.selectedElements.length === 0) {
    // If no elements are selected, show all jobs (no filtering needed)
    this.jobs = [...this.originalJobs];
  } else {
    // Filter jobs based on the selectedElements array
    this.jobs = this.originalJobs.filter(job => {
      // Check if the job contains all the selected elements
      return (
        this.selectedElements.every(el => {
          // Check if the element is present in the job's properties
          return (
            el === job.level ||
            el === job.role ||
            job.languages.includes(el) ||
            job.tools.includes(el)
          );
        })
      );
    });
  }
},


  }
}
</script>
<style>
body{
background-color: hsl(180, 52%, 96%);
  display: flex;
  justify-content: center;
  text-align: center;
}
.header{
  background: hsl(180, 29%, 50%);
  margin: -10px -8px 0 -10px;
  /* width: 100%; */
  margin-bottom: 30px;
}
.header img{
  width: 100%;
}
.selected-elements {
  margin-top: 20px;
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  gap: 8px;
  height: 40px;
  /* width: 800px; */
  background: hsl(180, 29%, 50%) ;
  margin: 0 auto;
  justify-content: space-between;
  max-width: 800px;
}
button{
  margin: 0 5px 0 5px;
  height: 40px;
}


.selected-element {
  background-color: hsl(180, 14%, 95%);
  padding: 6px 10px;
  border-radius: 3px;
  color: hsl(180, 29%, 50%);
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-left: 5px;
}

.remove-icon {
  margin-left: 5px;
  cursor: pointer;
}

@media screen and (max-width: 440px) {
    .selected-elements {
    
      justify-content: center;
      max-width: 440px;
      margin: -20px 0 10px 0;
    }

    .selected-element {
    
      font-size: 12px;
    }

    button {
    
      margin: 0;
    }

    .like{
      margin-bottom: 20px;
    }

    
  } 

</style>
