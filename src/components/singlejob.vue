<template>
  <div class="bag">

    <li 
    :class="{ selected: isSelected, completed: job.completed === true }">

      <span class="mum">

        <div class="circle" v-for="logo in job.logos" :key="logo">
          <!-- Use relative import for each image in the logos array -->
          <img :src="getImagePath(logo)" alt="">
        </div>

        <div class="beside">
          <div class="beside-top">
            <span class="company">{{ job.company }}</span>
            <span v-if="job.new" class="new">New</span>
            <span v-if="job.featured" class="featured">Featured</span>
          </div>

          <div 
            :class="['title', { active: isSelected }]"
            @click="toggleSelectionAndCompleted" >
            {{ job.position }}
          </div>
          
          <div class="below">
            <span>{{ job.postedAt }}</span> . <span>{{ job.contract }}</span> . <span>{{ job.location }}</span>
          </div>
        </div>
        

      </span>

      <div class="linerr"></div>

      <span class="farside">
        
       
  <div class="night" @click="addElementToBox(job.level)">{{ job.level }}</div>
  <div class="night" @click="addElementToBox(job.role)">{{ job.role }}</div>

  <!-- Display languages if there are more than one -->
  <div v-if="job.languages.length > 1">
    <span v-for="language in job.languages" :key="language" class="language" @click="addElementToBox(language)">
      {{ language }}
    </span>
  </div>

  <!-- Display single language if there's only one -->
  <div v-else-if="job.languages.length === 1" class="language" @click="addElementToBox(job.languages[0])">
    {{ job.languages[0] }}
  </div>

  <!-- Display tools if there are more than one -->
  <div v-if="job.tools.length > 1">
    <span v-for="tool in job.tools" :key="tool" class="tool" @click="addElementToBox(tool)">
      {{ tool }}
    </span>
  </div>

  <!-- Display single tool if there's only one -->
  <div v-else-if="job.tools.length === 1" class="tool" @click="addElementToBox(job.tools[0])">
    {{ job.tools[0] }}
  </div>

      </span>
      
    </li>
  </div>
</template>

<script>
export default {
  props: ['job', 'addElementToBox'],
  data() {
    return {
      isSelected: false,
    };
  },
  methods: {
    toggleSelectionAndCompleted() {
      this.isSelected = !this.isSelected;
      this.job.completed = !this.job.completed;
      
    } ,   
      // Use the addElementToBox method received as a prop
    addElementToBox(element) {
      this.addElementToBox(element);
    },
    getImagePath(image) {
      // Split the relative path by backslashes and join with forward slashes
      // This is to ensure it works correctly across different operating systems
      const imagePathParts = image.split('\\').join('/');
      // Return the correct relative path
      return require(`@/${imagePathParts}`);
    },
  },
}
</script>

<style>
.selected, .completed {
  border-left: 4px solid hsl(180, 29%, 50%);
}
.company{
  color: hsl(180, 29%, 50%) !important;
}
.mum{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 30px 0 10px;
}
.mum div{
  margin-right: 20px;
}
.circle{
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
.new {
  height: 20px;
  width: 45px;
  border-radius: 15px;
  background: hsl(180, 29%, 50%);
  align-items: center;
  display: inline-block;
}
.featured{
  height: 20px;
  width: 85px;
  border-radius: 15px;
  display: inline-block;
  background:hsl(180, 14%, 20%);
  align-items: center;
}
.title{
  font-size: 15px;
  color: black;
  font-weight: 700;
}
.title:hover{
  color: hsl(180, 29%, 50%);
  cursor: pointer;
}
.title.active {
  color: hsl(180, 29%, 50%);
}

li{
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 140px;
  background: white;
  width: 900px;
  margin-bottom: 30px;
  box-shadow: 2px 5px 4px 1px hsl(180, 13%, 94%);
  border-radius: 3px;
  
}
li span{
  margin-right: 10px;
}
.farside {
  display: flex;
  align-items: center;
  justify-content: center;
}


.beside-top span{
  margin-right: 5px;
  color: white;
  text-align: center;
}
.beside{
  text-align: left;
}
.beside-top{
align-items: center;
}
.bag{
  text-align: center;
  display: flex;
  justify-content: center;
}
.beside div{
  margin-bottom: 7px;
}

.below{
  color: hsl(180, 8%, 52%);
}


.language,
.tool,
.night {
  display: inline-block;
  background: hsl(180, 31%, 95%);
  padding: 3px 10px;
  margin: 3px;
  border-radius: 2px;
  font-size: 12px;
  color: hsl(180, 29%, 50%);
  cursor: pointer;
}

.night:hover{
  background:hsl(180, 29%, 50%) ;
  cursor: pointer;
  color: white;
}
.language:hover, .tool:hover{
  background:hsl(180, 29%, 50%) ;
  cursor: pointer;
  color: white;
}

.shower{
  height: 20px;
  width: 140px;
  border-radius: 15px;
  background: hsl(180, 29%, 50%);
  align-items: center;
}

 @media screen and (max-width: 440px) {
  li{
  display: flex;
  box-sizing: border-box;
  height: 210px;
  background: white;
  width: 340px;
  margin-bottom: 30px;
  box-shadow: 2px 5px 4px 1px hsl(180, 13%, 94%);
  border-radius: 3px;
  padding-left: 10px;
  flex-direction: column;
}
li span{
  margin-top: -30px;
}


.circle{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.circle img{
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.mum{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: left;
  
}

/* .farside {
 
  margin-top: 30px;

} */

.beside div{
 
  margin: 10px 0 0px 0;
}

.linerr{
  height: 2px;
  width: 290px;
  background: black;
  margin-bottom: -20px;
  margin-top: 20px;
}

.farside {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start; /* Adjust as needed */
      margin-top: 30px;
      margin-left: 15px;
    }

    /* .language,
    .tool,
    .night {
      flex-basis: calc(50% - 6px); 
      margin-bottom: 3px;
    } */

} 



</style>