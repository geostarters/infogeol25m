<script>
  import Textfield, { Input, Textarea } from "@smui/textfield";
  import Icon from "@smui/textfield/icon/index";
  import HelperText from "@smui/textfield/helper-text/index";
  import CharacterCounter from "@smui/textfield/character-counter/index";
  import { Icon as CommonIcon } from "@smui/common";
  import IconButton from "@smui/icon-button";
  import FloatingLabel from "@smui/floating-label";
  import LineRipple from "@smui/line-ripple";
  import NotchedOutline from "@smui/notched-outline";
  import { onMount, getContext } from "svelte";
  import Button from "@smui/button";
  import mapbox from "mapbox-gl";
  import { keyApp } from "../../config";
  import PanelSearchResults from "./PanelSearchResults.svelte";
  import Checkbox from "@smui/checkbox";
  import FormField from "@smui/form-field";
  import AutoComplete from "simple-svelte-autocomplete";
  import Select from "@smui/select";

  let selectedValue = undefined;
  let opcioCoord = [];

  const changePlace = getContext("changePlace");

  let searchTerm = "";

  let minCharacter = 2;
  let maxResults = 0;
  let fullTextSearch = "exact";
  var json = [];

  let coords = [];
  let option;
  let val = "";
  let timer;

  const debounce = v => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      searchTerm = v;
      findResults(searchTerm);
    }, 250);
  };
  const searchUrl =
    "https://betaserver.icgc.cat/icgc_geocoder/?maxresultats=17&obtenirCoordGeografiques=si&tipus=Municipi&metode=localitzaToponim&ordre=alfabetic&trobaTots=no&nom=";

  const findResults = async event => {
    const response = await fetch(`${searchUrl}${searchTerm}`);

    json = await response.json();

    json.forEach(element => {
      const nomOpcio = element.nom;

      const coordOpcio = element.coordenadesLonLat;

      const opcio = [{ coordOpcio, nomOpcio }];
    });
  };

  function changePlaces(option) {
    coords = option.coordenadesLonLat;

    changePlace({ coords });
    searchTerm = option.nom
    //searchTerm = "";
  }

  function removeTerm() {
    
    searchTerm = "";
  }

function changeTerm(option){
  searchTerm = option.nom
  addEventListener("keypress", function onEvent(event) {
    
    if (event.key === "Enter") {

        changePlaces(option)
    }
    if (event.key === "Escape") {
      //console.log('h')
        removeTerm()
    }
});
addEventListener("keydown", function onEvent(event) {
    
  
    if (event.key === "Escape") {

        removeTerm()
    }
});
}
  
</script>

<style>
  .form-group{
    align-content: space-between;
  }
  #text {
    color: blueviolet;
  }
  .search-text-input {
    margin-top: 17px;
    margin-left: 25px !important;
    /* width: 220px !important; */
  }
  .searchbox {
    /* min-width: 120px !important; */
    width: 87%;
    margin-top: 0!important;
    height: 33px!important;
    margin-left: -14px!important;
    z-index: 1000!important;
  }
  #optionLabel {
    /* border-color: black;
    background-color: white; */
    color: black;
    /* border-width: 1px; */
    z-index: 3000 !important;
    cursor: pointer;
  }
  .optionLabel:hover {
    color: rgb(50, 112, 205);
  }

  .results {
    display: flex;
    flex-wrap: wrap;
    width: 146px !important;
    justify-content: space-around;
    margin-top: 2em;
    background-color: dimgray;
  }

  #resultsBox {
    display: block;
    margin-top: 20px;
    background-color: dimgray;
  }
  .iconaSurt {
    size: small;
  }
  #buttonSurt{
    margin-left: 0px;
    color: black;
    background-color: blue !important;
 
  }
  /* .selectResults {
    /* position: absolute; */
    /*border-color: #000; */
    /* background-color: #fff; */
    /* border-width: thin; */
    /* outline: auto; */
    /* outline-color: #00008b; */
    /* left: 19px;
    top: 102px;
    margin-left: -6px;
    margin-top: -6px;
    overflow-y: auto;
    max-height: 528px;
    width: 88%;
  } */ 
  /* .selectResults {
    left: 19px;
    top: 99px;
    margin-left: -7px;
    margin-top: -69px;
    overflow-y: auto;
    
    max-height: 200px;
    width: 90.3%;
    border-style: ridge;
    } */
    .selectResults{
      left: 19px;
    top: 99px;
    margin-left: -13px;
    margin-top: -13px;
    overflow-y: auto;
    max-height: 200px;
    width: 86.0%;
    border-style: solid;
    border-width: 1px;
    border-color: #cccccc;
    }
  @media (max-width: 624px) {
    .results {
    display: flex;
    flex-wrap: wrap;
    width: 146px !important;
    justify-content: space-around;
    margin-top: 2em;
    background-color: dimgray;
  }
    .selectResults {
      left: 19px;
    top: 102px;
    margin-left: -6px;
    margin-top: -6px;
    overflow-y: auto;
    max-height: 528px;
    width: 88%;
      
    }
    #optionLabel {
      font-size: small !important;
    }

    .searchbox {
    width: 70%;
    margin-top: 0!important;
    height: 43px!important;
    margin-left: -7px!important;
    z-index: 1000!important;
    }

  }
  @media (max-width: 500px) {
    .selectResults {
      left: 19px;
    top: 102px;
    margin-left: -6px;
    margin-top: -6px;
    overflow-y: auto;
    max-height: 528px;
    width: 88%;
      
    }
    #optionLabel {
      font-size: x-small !important;
    }

    .searchbox {
    width: 62%;
    margin-top: 0!important;
    height: 43px!important;
    margin-left: -7px!important;
    z-index: 1000!important;
    }
  }
  @media (max-width: 321px) {

    .mdc-icon-button {
    width: 8px !important;
    height: 8px !important;
    }
    
    .selectResults {
      left: 19px;
    top: 102px;
    margin-left: -6px;
    margin-top: -6px;
    overflow-y: auto;
    max-height: 528px;
    width: 88%;
      
    }
    .search-text-input {
    margin-top: 17px;
    margin-left: 15px !important;
    /* width: 220px !important; */
  }
    #optionLabel {
      font-size: x-small !important;
    }

    .searchbox {
    width: 80%;
    margin-top: 0!important;
    height: 30px!important;
    margin-left: -2px!important;
    z-index: 1000!important;
    }
  }
</style>

<div class="search-text-input ">

  <form class="form">
    <div class="form-group">
      <input
        withTrailingIcon
        placeholder="Cerca un municipi"
        id="searchTerm"
        class="form-control searchbox"
        type="text"
        bind:value={searchTerm}
        style="border-top-color: transparent;
        border-left: transparent;
        background-color: #f3f3f3;
        border-right: transparent;
        border-radius: 6px;"
        on:keyup={({ target: { value } }) => debounce(value)} />
        <!-- <IconButton class="buttonSurt" on:click={removeTerm(searchTerm)}>
          <Icon style="font-size: smaller" class="material-icons iconaSurt ">
            clear
          </Icon>
        </IconButton> -->
        {#if searchTerm.length > 2}
      <IconButton id="buttonSurt" style=" top: 4px;" on:click={removeTerm(searchTerm)} >
        <Icon style="font-size: smaller;padding-left:-10px;" class="material-icons iconaSurt ">
          clear
        </Icon>
         </IconButton>
    {/if}
    </div>

  </form>


{#if searchTerm.length > 2}
 
  <div class="selectResults" >
    {#each json as option}
      <option on:submit={changePlaces(option)}
        on:click={changePlaces(option)}
        on:focus={changeTerm(option)}
        id="optionLabel"
        labelFieldName="nom" tabindex="0">
        {option.nom}
      </option>
    {/each}

  </div>
{/if}


  
</div>
