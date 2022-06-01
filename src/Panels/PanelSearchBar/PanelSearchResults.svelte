<script>
  import { onMount, getContext } from "svelte";
  import Select from "@smui/select";

  const changePlace = getContext("changePlace");

  export let json;
  export let selectedValue;
  let coords = [];
  let option;

  function changeToCoord(selectedValue) {
    json.forEach(element => {
     
      const nomOpcio = element.nom;

      const coordOpcio = element.coordenadesLonLat;

      const opcio = [{ coordOpcio, nomOpcio }];

      if (opcio[0].nomOpcio === selectedValue) {
        coords = opcio[0].coordOpcio;

        changePlace({ coords });
      } else {
        return;
      }
    });
  }
</script>

<style>
  .results {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 2em;
  }
  #resultsBox {
    display: block;
    margin-top: 20px;
  }
  .selectResults {
    border-radius: 2px;
    position: relative;
    left: -53px;
    top: -7px;
    height: 43px;
    z-index: 1;
  }
  @media (max-width: 665px) {
    .results {
      font-size: 1rem !important;
      position: absolute;
      /* left: 50%; */
      /* top: 50%; */
      font-size: small;
      width: 200px !important;
    }
    .selectResults {
      border-radius: 0;
      position: absolute;
      left: 14px;
      top: -10px;
      height: 27px;
      z-index: 1;
      font-size: small;
      width: 110px;
    }
    .optionLabel {
      font-size: x-small !important;
    }
  }
</style>

<div class="results" tabindex="0">
  <select
    class="selectResults"
    bind:value={selectedValue}
    onchange={changeToCoord(selectedValue)} tabindex="0" >
    {#each json as option}
      <option class="optionLabel" labelFieldName="nom" tabindex="0">{option.nom}</option>
    {/each}

  </select>
</div>
