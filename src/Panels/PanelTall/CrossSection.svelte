<script>
  export let linkjpg;
  export let selected;
  export let typedata;
  // console.log("typoe", typedata);

  let url;
  if (typedata === "cols" || typedata === "relacions") {
    url = linkjpg;
  }
  if (typedata === "talls") {
    url = `https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/talls/${selected}.jpg`;
  } else {
  }
</script>

<style>
  #containertalls {
    z-index: 2;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  #containercols {
    z-index: 2;
    position: absolute;
    bottom: 0;
    width: 100%;
 
    display: flex;
    justify-content: center;
  }
  .tall {
    width: 70%;
    border-width: 2px;
    border-style: solid;
    margin-left: 15%;
    max-width: 100%;
    max-height: 71em;
  }
  .col {
    border-width: 2px;
    border-style: solid;

    max-width: 100%;
    max-height: 56em;
  }
  .tanca {
    float: right;
    position: relative;
  }
</style>

{#if typedata === 'cols' || typedata === 'relacions'}
  <div id="containercols"><img src={url} alt="imatgeCol" class="col" /></div>
  {/if}
   {#if typedata === 'talls'}
  <div id="containertalls"><img src={url} alt="imatgeTall" class="tall" /></div>
{/if}
