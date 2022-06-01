<script>
  import IconButton, { Icon } from "@smui/icon-button";
  import { onMount, getContext } from "svelte";
  import { keyApp } from "../../config";

  //console.log("entro llegenda");

  export let item;
</script>

<style>
  .container {
    display: grid;
    width: 200px;
    background-color: white;
    right: 10px;
    padding: 5px;
    border-radius: 10px !important;
  }
</style>

<div class="container">{item.label}</div>
