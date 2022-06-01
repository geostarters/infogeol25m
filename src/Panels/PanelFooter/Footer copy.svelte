<script>




import { onMount, getContext } from "svelte";
import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, Twitter } from 'svelte-share-buttons-component';

  import { keyApp } from "../../config";

  import mapbox from "mapbox-gl";
  const { getMap } = getContext(keyApp);
  const map = getMap();

import IconButton, { Icon } from "@smui/icon-button";
import EnllacaModal from './EnllacaModal.svelte';

// console.log('map', map)
let show= false;
let myUrl = '';
let ifr = '';


	const title = `Capes d'Informació Geològica`;
	const desc = `Visor de Capes d'Informació Geològica`;


function enllacaModal (){
  // console.info('hola')

  let currentURLRaw = window.location.href.valueOf();
  // --> http://localhost:5000/#8.5/41.8247/1.8155
  // console.info('//', currentURLRaw)
  myUrl = currentURLRaw
  
   ifr = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${currentURLRaw}"></iframe>`
// console.log(ifr)

  show = !show
}

function openLinkedin (){
  // console.log('hola linkedIn')
}

function openFacebook (){
  // console.log('hola facebook')
}
function openMail (){
  // console.log('hola mail')
}
function openTwitter (){
  // console.log('hola twitter')
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
    bottom: -18px;
    /* cursor: pointer; */
    right: 0;
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
      <div class="col-sm-6 text-center rrss">
        <div id="share">
          
<Email subject="{title}" body="{desc} {myUrl}" />
<HackerNews class="share-button" {title} {myUrl} />
<Reddit class="share-button" {title} {myUrl} />
<LinkedIn class="share-button" {myUrl} />
<Tumblr class="share-button" {title} {myUrl} caption="{title}" />
<Pinterest class="share-button" {myUrl} description={title} />
<Telegram class="share-button" text={title} {myUrl} />
<Vk class="share-button" {title} {myUrl} />
<WhatsApp class="share-button" text="{title} {myUrl}" />
<Xing class="share-button" {title} {myUrl} />
<Facebook class="share-button" {myUrl} />
<Twitter class="share-button" text="{title}" {myUrl} />
          <IconButton  on:click={openMail}>
            <!-- <Icon class="material-icons icono" tabindex="1" on>menu</Icon> -->
            <i class="fa fa-envelope"></i>
            
          </IconButton>
          <IconButton  on:click={openFacebook}>
            <!-- <Icon class="material-icons icono" tabindex="1" on>menu</Icon> -->
            <i class="fa fa-facebook"></i>
            
          </IconButton>
          <IconButton   on:click={openTwitter}>
            <!-- <Icon class="material-icons icono" tabindex="1" on>menu</Icon> -->
            <!-- <Icon class="font-awesome icono" tabindex="1" >twitter</Icon>  -->
            <i class="fa fa-twitter"></i>
          </IconButton>
          <IconButton   on:click={openLinkedin}>
            <!-- <Icon class="material-icons icono" tabindex="1" on>menu</Icon> -->
            <!-- <Icon class="font-awesome icono" tabindex="1" >twitter</Icon>  -->
            <i class="fa fa-linkedin"></i>
          </IconButton>
        </div>
      </div>
    </div>


</div>
{#if show}
<EnllacaModal show={show} myUrl={myUrl} ifr={ifr}/>
{/if}