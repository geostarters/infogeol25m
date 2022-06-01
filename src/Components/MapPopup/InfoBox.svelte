<script>

    export let exportartextok;

// let showthatText = [];
//     exportartextok.forEach(element => {
//       let str = JSON.stringify(element)
//       console.log('e', str)
//       str = str.replace('"',' ').replace('{','').replace('}','').replace('":"',': ').replace('"', '')
//       showthatText.push(str)
//       console.log(showthatText)
//     });

</script>
<style>
 .hola{
  
  background-color: #ffffff;
  position: absolute;
  top: 4.5em;
  right: 0%;
  width: 20em;
}
p, h4{
  font-family: Fira Sans,Times,serif;
    
  
}
#text{
  font-family: Fira Sans,Times,serif;
    font-size: 13px;
}
</style>

    
  <h4>Informació</h4>
  <div id="text">
    {#each exportartextok as info}
  <p>{info}</p>
    
  {/each}
 
  </div>
  
  
