<script>
  import { getContext } from "svelte";
  import Checkbox from "@smui/checkbox";
  import FormField from "@smui/form-field";
  import SliderOpacity from "./SliderOpacity.svelte";
  import LegendLayers from "./LegendLayers.svelte";
  import { onMount, setContext, onDestroy } from "svelte";
  import overLayersStyle from "../../infogeo_v7_style.json";
  import Button from "@smui/button";
  let overLayers = { ...overLayersStyle };
  //let slider_show = false;
  let display = false;

  export let activated = true;

  export let item;
// console.log('i', item.value)
  let slider_show = true;

  const activateLayer = getContext("activateLayer");



  let array = item.value.split(",");

  array.forEach((capa) => {
      overLayers.layers.forEach((element) => {
        if (element.layout && element.layout.visibility) {
          if (element["source-layer"] === capa) {
            if (element.layout["visibility"] === "visible"){
              activated = true
            } else {
              activated = false
            }
          }
        }
      });
    });


  // onMount(async() => {
  //   if (item.value === "P_despreniments") {
  //     activated = false;
  //   }
  //   if (item.value === "P_esllavissades") {
  //     activated = false;
  //   }
  //   if (item.value === "P_esfondraments") {
  //     activated = false;
  //   }
  //   if (item.value === "P_cons") {
  //     activated = false;
  //   }
  //   if (item.value === "p_allaus") {
  //     activated = false;
  //   }
  //   // if (item.value === "P_inundabilitat") {
  //   //   activated = false;
  //   // }
  // });

  // function showSliderOpacity() {
  //   if (showSliderOpacity) {
  //     slider_show = !slider_show;
  //   }
  // }
</script>

<style>
.labels{
  color:black;
  width: 100% !important;
  font-weight: 700;
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
}
.field{
  width: 100% !important;
  padding-left: 10px;
  font-family: Arial, Helvetica, sans-serif;
}
@media (max-width: 624px) {
  .labels{
    font-weight: 500;
  font-size: smaller;
  
}
  }
  @media (max-width: 500px) {
    .labels{
      font-weight: 500;
font-size: smaller;

}
  }
  @media (max-width: 321px) {
    .labels{
      font-weight: 500;
font-size: smaller;

}
  }

</style>

<FormField class="field" style="padding-left: 10px;">

  <Checkbox
    bind:checked={activated}
    on:change={() => activateLayer(item, activated)} />
    {#if item.label.includes("Columnes")}
    <span class="labels" style="color:grey; font-weight: 600;" >
      {item.label}
     
     
  
    </span>
    {:else}
    <span class="labels" >
    {item.label}
     {#if item.label === 'Unitats geològiques' && activated && item.value === 'FILLq,PATT1q,LABELq/label'}
      <SliderOpacity {item} />
    {/if}

    {#if item.label === 'Unitats geològiques' && activated && item.value === 'FILL,PATT1,PATT2,PATT3,PATT4,LABEL/label'}
      <SliderOpacity {item}  />

      
    {/if}
   

  </span>
    {/if}
  

</FormField>
