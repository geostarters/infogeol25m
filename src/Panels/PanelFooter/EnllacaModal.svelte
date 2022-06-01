<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { fade } from "svelte/transition";
  import LineRipple from "@smui/line-ripple";
  import IconButton, { Icon } from "@smui/icon-button";

  function overlay_click(e) {
    if ("close" in e.target.dataset) show = false;
  }
export let myUrl;
export let ifr;
  export let show = false;
  function closeButton () {
    show = false
  }
</script>

<style>
  .field1{
    margin: 0px;
  }

  .field2{

  }
  .modal-overlay {
    z-index: 2000;
    font-size: 10px !important;
    font-family: Arial, Helvetica, sans-serif;
    /* overflow: auto;
display: flex;
 position: fixed;
    top: 35%;
    left: 30%;
    transform: translate(-23%,-23%); */
  }
  #urlMap{
    width: -webkit-fill-available;
    font-weight: 500;
  }
  #iframeMap{
    width: -webkit-fill-available;
    font-weight: 500;
  }
  .modal-container {
    /* overflow: auto; */
    display: block;
    position: fixed;
    top: 36%;
    left: 26%;
    bottom: 0;
    transform: translate(-23%, -23%);
    font-family: Arial, Helvetica, sans-serif;
    height: 25%;
    width: 75%;
  }
  .textModal{
    font-size: small !important;
    font-family: Arial, Helvetica, sans-serif;
  }
h6{
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  position: relative;
    top: -35px;
    margin-bottom: -25px;
}
h5{
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;
}
  @media (max-width: 600px) {
    .modal-overlay {
      /* font-size: smaller !important; */
    }
    h6{
  font-size: 0.8rem;
}
h5{
  font-size:0.9rem;
}
  }
  @media (max-width: 321px) {
    h6{
  font-size: 0.7rem;
}
h5{
  font-size:0.8rem;
}

  }
</style>

{#if show}
  <div>
    <div
      class="modal-overlay"
      data-close
      on:click={overlay_click}
      transition:fade={{ duration: 150 }}>
      <div class="modal-container text">
        <IconButton
        on:click={closeButton}
        style="    position: absolute;
      right:-3px;
      
      z-index: 10;">
        <Icon
          style="        font-size: 22px;
      color: black;
      
      border-radius: 17px;"
          class=" material-icons  ">
          close
        </Icon>
      </IconButton>
        <!-- <Title id="dialog-title" >
          <b>Visor Riscos Geològics</b>
        </Title>
        <LineRipple /> -->
        <Content id="dialog-content" class="textModal" >    <div class="content">
          <div class="ui message modalMsg">
            <!-- <div class="header">
              Enllaçar
            </div> -->
         
                <h6>Per enllaçar amb aquest mapa, copieu i enganxeu el següent
                  text</h6>
                <input type="text" value={myUrl} id="urlMap" >
              
                <h6>Per inserir aquest mapa al vostre web, copieu i enganxeu el següent
                  text</h6>
                <textarea id="iframeMap" rows="3" value={ifr}></textarea>
      
    
          </div>
    
        </div>

        </Content>

      </div>
    </div>

  </div>
  
{/if}
