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
  .indent{
    padding-left: 15px;
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
  .modal-container {
    overflow-y: auto;
    overflow-x: hidden;
    display: block;
    position: fixed;
    top: 22%;
    left: 26%;
    bottom: -7%;
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
  color: black;
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
          <h5><b>Funcionalitats</b></h5>
        </Title>
        <LineRipple />
        <Content id="dialog-content" class="textModal" ><h6>
              <p>
            <b>Visualització de les capes:</b>
          </p>
          <p>
            Les capes activades en iniciar el visor són, per defecte, Basament
            prequaternari i Dipòsits quaternaris. Inicialment, la resta de capes estan
            desactivades. Per visualitzar o amagar una capa cal clicar el botó
            check situat a l’esquerra d’aquesta.
          </p>
          <p>
            Es pot ajustar, amb una barra lliscant, la transparència de les unitats geològiques en les capes Basament
            prequaternari i Dipòsits quaternaris, respectivament.
          </p>
          <p>
            Recomanacions de visualitzacions de les capes:
          </p>
          <p class='indent'>
            · Es recomana visualitzar les capes Mesures d’estructures, Talls geològics
            i Esquemes de relacions estratigràfiques (Registre Geològic) juntament amb
            la capa Basament prequaternari.
          </p>
          <p class='indent'>
            · Es recomana visualitzar la capa Columnes estratigràfiques (Registre geològic) desactivant la resta de
            capes.
          </p>
          <p>
            En clicar el botó 3D es pot veure en continu la cartografia en relleu. Amb aquest mode activat, 
            es controla la navegació 3D amb el botó dret del ratolí.
          </p>
          <p>
            <b>Informació de les capes:</b>
            <b></b>
          </p>
          <p>
            En clicar sobre qualsevol punt del mapa, el visor retornarà informació de
            les capes visibles segons aquest ordre de prioritat:
          </p>
          <p class='indent'>
            1. Mesures d’estructures
          </p>
          <p class='indent'>
            2. Talls geològics
          </p>
          <p class='indent'>
            3. Terrenys antropitzats
          </p>
          <p class='indent'>
            4. Registre geològic
          </p>
          <p class='indent'>
            5. Dipòsits quaternaris
          </p>
          <p class='indent'>
            6. Basament prequaternari
          </p>
          <p>
            <b>Informació Mesures d’estructures:</b>
            tipus de mesura, orientació i, si s’escau, inclinació.
          </p>
          <p>
            <b>Informació Talls geològics: </b>
            identificador/s del full 1:25.000 i el número de tall geològic del mapa
            publicat GTI. Clicant sobre una traça de tall s’il·lumina la traça
            corresponent i es pot visualitzar i descarregar el tall geològic. La
            descàrrega inclou el tall en format jpg i una taula en format xlsx,
            amb informació litostratigràfica de les unitats que el composen.
          </p>
          <p>
            <b>Informació Terrenys antropitzats:</b>
            epígraf, descripció, tipus de terreny i edat. Clicant sobre un terreny
            antropitzat s’il·luminen tots els del mateix epígraf distribuïts en el
            conjunt del territori cartografiat.
          </p>
          <p>
            <b>Informació Registre geològic:</b>
          </p>
          <p class='indent'>
            <b>Informació Columnes estratigràfiques:</b>
            identificador/s del full 1:25.000 del mapa publicat GTI i la seva
            descripció. Clicant en un grup cronoestratigràfic, s’il·lumina aquest grup
            en tot territori cartografiat, ressaltant el del mapa corresponent. Es pot
            visualitzar i descarregar les columnes estratigràfiques. La descàrrega
            inclou la columna<b> </b>en format jpg i una taula en format xlsx, amb
            informació litostratigràfica de les unitats que la composen.
          </p>
          <p class='indent'>
            <b>Informació Esquemes de relacions estratigràfiques:</b>
            identificador/s del full 1:25.000 del mapa publicat GTI i la seva
            descripció. Clicant en un mapa, aquest s’il•lumina i es pot visualitzar i
            descarregar l’esquema de relacions estratigràfiques. La descàrrega inclou
            l’esquema en format jpg i una taula en format xlsx, amb informació
            litostratigràfica de les unitats que el composen.
          </p>
          <p>
            <i></i>
          </p>
          <p>
            <b>Informació Dipòsits quaternaris i Basament prequaternari:</b>
          </p>
          
          <p class='indent'>
            <b >     Informació Unitats geològiques:</b>
            unitat, descripció, edats geològiques, l’identificador del full 1:25.000 i,
            si s’escau, el tipus de metamorfisme i la seva edat. Clicant una unitat
            geològica, s’il•luminen totes les del mateix epígraf distribuïdes en el
            conjunt del territori cartografiat, ressaltant en un altre color les del
            full corresponent.
          </p>
          <p class='indent'>
            <b >Informació Contactes, Falles i plecs i Elements geomorfològics:</b>
            descripció de l'element. Clicant sobre un element s’il·luminen tots els del mateix tipus
            distribuïts en el conjunt del territori cartografiat.
          </p>
 
               
        </h6>

        </Content>

      </div>
    </div>

  </div>
  
{/if}
