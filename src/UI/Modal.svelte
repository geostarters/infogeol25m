<script>
  import Dialog, { Title, Content, Actions } from "@smui/dialog";
  import Button, { Label } from "@smui/button";
  import { fade } from "svelte/transition";
  import LineRipple from "@smui/line-ripple";
  import IconButton, { Icon } from "@smui/icon-button";
  function overlay_click(e) {
    if ("close" in e.target.dataset) show = false;
  }

  export let show = false;
  function closeButton () {
    show = false
  }
</script>

<style>
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
  .modal-container {
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    position: fixed;
    top: 31%;
    left: 26%;
    bottom: 0%;
    transform: translate(-23%, -23%);
    font-family: Arial, Helvetica, sans-serif;
    border-radius: 18px;
  }
  .textModal{
    font-size: small !important;
    font-family: Arial, Helvetica, sans-serif;
  }
h6{
  font-size: 1rem;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 100;
  color: black
}
h5{
  font-size: 1.1rem;
  font-family: Arial, Helvetica, sans-serif;
  margin-top: -43px;
    margin-bottom: -26px;
}
  @media (max-width: 600px) {
    .mdc-dialog__title {
font-size: smaller;
    }
    .modal-overlay {
      /* font-size: smaller !important; */
    }
    h6{
  font-size: 0.8rem;
}
h5{
  font-size:0.9rem;
  margin-top: -43px;
    margin-bottom: -26px;
}
  }
  @media (max-width: 321px) {
    .mdc-dialog__title {
font-size: smaller;
    }
    h6{
  font-size: 0.7rem;
}
h5{
  font-size:0.8rem;
  margin-top: -43px;
    margin-bottom: -26px;
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
          style="              font-size: 22px;
          color: black;
          
          border-radius: 17px;"
          class=" material-icons  ">
          close
        </Icon>
      </IconButton>
        <Title id="dialog-title" >
          <h5><b>Capes d’informació del Mapa Geològic de Catalunya 1:25.000</b></h5>
        </Title>
        <LineRipple />
        <Content id="dialog-content" class="textModal" ><h6>
          El visor <i>Capes d’informació del Mapa Geològic de Catalunya 1:25.000 (MGC25m) </i>permet consultar informació estructurada per 
          capes derivades dels fulls publicats de la sèrie Mapa Geològic de Catalunya 1:25.000 en el marc del Geotreball I (GT I) 
          i Geotreball II (GT II). <br />
          La present versió permet consultar de forma interactiva informació referent a 6 capes d’informació: Dipòsits quaternaris, 
          Basament prequaternari, Terrenys antropitzats, Mesures d’estructures, Talls geològics i Registre geològic 
          (Columnes estratigràfiques i Esquemes de relacions estratigràfiques). També permet descarregar alguns dels 
          continguts que es mostren i documentació complementària associada.<br />
          El visor està vinculat al sistema de capes d’informació geològica que l’ICGC està implementant i que està orientat 
          a emmagatzemar, actualitzar i difondre, a través de diferents canals, informació geològica del conjunt del territori. 
          La informació geològica que integra el visor és fonamentalment de caràcter qualitatiu. Es tracta d’una informació 
          descriptiva i indicativa, que no pot substituir interpretacions d’especialistes, recomanacions professionals i/o 
          investigacions i recerques específiques detallades. Les interpretacions que s’exposen es basen en el coneixement 
          dels autors dels fulls publicats del MGC25m i de l’equip de geòlegs de l’ICGC. Es preveu que el contingut d’aquestes 
          capes d’informació s’ampliï progressivament a mesura que es disposi de nova informació. Els continguts actuals són 
          susceptibles de canviar a conseqüència de l’existència noves dades i observacions, d’avenços en el coneixement, o 
          millores en els mètodes d’interpretació. <br />
          Es recomana que el present visor es referenciï com: <br />
          ICGC, 2021. Visor de Capes d’informació del Mapa Geològic de Catalunya 1:25.000. Versió 1 de 30/11/2021. 
            <a target="_blank"
              href="https://visors.icgc.cat/infogeo25">
              https://visors.icgc.cat/infogeo25/
            </a> (data de consulta).
             <br /><br />
            Per més informació o comentaris sobre el visor adreceu-vos a  
            <a
              href="mailto:icgc@icgc.cat">
              icgc@icgc.cat
            </a>

               
        </h6>

        </Content>

      </div>
    </div>

  </div>
  
{/if}
