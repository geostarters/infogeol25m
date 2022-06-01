<script>
import { onMount, getContext } from "svelte";
import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, Twitter } from 'svelte-share-buttons-component';

  import { keyApp } from "../../config";

  import mapbox from "mapbox-gl";
  const { getMap } = getContext(keyApp);
  const map = getMap();

import IconButton, { Icon } from "@smui/icon-button";
import EnllacaModal from './EnllacaModal.svelte';

//console.log('map', map)
let show= false;
let myUrl = '';
let ifr = '';


	const title = `Capes d'Informació Geològica`;
	const desc = `Visor de Capes d'Informació Geològica`;


function enllacaModal (){
  //console.info('hola')

  let currentURLRaw = window.location.href.valueOf();
  // --> http://localhost:5000/#8.5/41.8247/1.8155
  //console.info('//', currentURLRaw)
  myUrl = currentURLRaw
  
   ifr = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${currentURLRaw}"></iframe>`
//console.log(ifr)

  show = !show
}

function createUrl (){
 // console.log('create')
  let currentURLRaw = window.location.href.valueOf();
  // --> http://localhost:5000/#8.5/41.8247/1.8155
  //console.info('//', currentURLRaw)
  // myUrl = currentURLRaw
myUrl = currentURLRaw

}

</script>



<style>


.footer {
  position: fixed;
    bottom: 0px;
    width: 100%;
    z-index: 1000000;
    background: #fed601;
    opacity: 1;
    height: 4%;
    min-height: 25px;
    
}
.enllaca{
  display: flex;
  position: fixed;
    bottom: -18px;
    cursor: pointer;
}
.rrss{
      display: flex;
    position: fixed;
    bottom: -10px;
    /* cursor: pointer; */
    right: 0;
}
p{    font-weight: 600;
    top: 1px;
    left: -5px;
    position: relative;
}

</style>
<div class="footer">
 
    <div class="row links">
      <div class="hidden-xs col-sm-6 text-center enllaca" on:click={enllacaModal}>
        <IconButton   >
          <!-- <Icon class="material-icons icono" tabindex="1" on>menu</Icon> -->
          <i class="fa fa-link"></i>
          
        </IconButton>
        <p>Enllaça</p>
        
       
      </div>
      <div class="col-sm-6 text-center rrss" on:click={createUrl} >
        <div id="share">
          
<Email subject="{title}" body="{desc} {myUrl}" />

<LinkedIn class="share-button" url={myUrl} />


<!-- 
<WhatsApp class="share-button" text="{title} {myUrl}" />

<Facebook class="share-button" url={myUrl} /> -->
<Twitter class="share-button" text="{title}" url={myUrl} />

        </div>
      </div>
    </div>


</div>
{#if show}
<EnllacaModal show={show} myUrl={myUrl} ifr={ifr}/>
{/if}