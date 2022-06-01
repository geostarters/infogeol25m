<script>
      import IconButton, { Icon } from "@smui/icon-button";
    export let groupLabel;
    export let showinfo;
 export let labelArray
    import { onMount } from "svelte";
    let oldlabel = ''
    onMount(async() => {
        // console.log('oor', showinfo, oldlabel, labelArray)
        oldlabel = groupLabel
        // console.log('oo1', oldlabel)
    })
    function letfalse () {
        // console.log('entro inii', showinfo)
showinfo=false
// console.log('entro final', showinfo)
    }

</script>

<style>

    .infoboxQt{
        /* position: fixed; */
        /* top:200px; */
    /* top: 10%; */
    left: 22em;
    /* width: 39em; */
    /* background-color: #f5f5f5; */
 
    margin-top: -12px;
    margin-left: 5px;
    margin-right: 11px;
    margin-bottom: 13px;
    max-height: 300px;
    overflow-y: scroll;
    font-size: 14px;
    padding: 3px;
    font-family: 'Fira Sans', sans-serif;


    }
    
    .infoboxBs{
        /* position: fixed; */
        /* top:200px; */
        /* top:28%; */
        left: 22em;
    /* width: 39em; */
    /* background-color:#f5f5f5; */
   
    margin-top: -12px;
    margin-left: 5px;
    margin-right: 11px;
    margin-bottom: 13px;
    max-height: 300px;
    overflow-y: scroll;
    font-size: 14px;
    padding: 3px;

    }
    
    .infoboxTalls{
        /* position: fixed; */
        /* top:200px; */
    /* top: 49%; */
    left: 22em;
    /* width: 39em; */
    /* background-color:#f5f5f5; */
 
    margin-top: -12px;
    margin-left: 5px;
    margin-right: 11px;
    margin-bottom: 13px;
    max-height: 300px;
    overflow-y: scroll;
    font-size: 14px;
    padding: 3px;

    }
</style>

{#if showinfo}
<div>
    
<div class="infoboxBs">
    <!-- <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4> -->
{#if groupLabel==="Basament prequaternari"}
<p>Cartografia harmonitzada del basament prequaternari del Geotreball I (GT I). La cartografia és contínua. S’interpreta la 
    distribució de les unitats de basament cobertes per dipòsits quaternaris o antròpics, segons un model d’unitats geològiques. 
    Els elements que conformen la capa s’estructuren en 3 conjunts d’informació: unitats geològiques; contactes (sedimentaris, 
    metamòrfics i magmàtics); i falles i plecs. Cada unitat cartogràfica s’identifica amb un epígraf que es caracteritza per un 
    color i en algun cas també per una trama. En futures versions s’adjuntarà l’equivalència entre els epígrafs publicats als 
    fulls MGC25m i els epígrafs actualitzats. 
     <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/BAS_LLEG">Veure llegenda de signes convencionals</a>. 

</p>
{/if}




{#if groupLabel==="Dipòsits quaternaris"}

<p>Cartografia harmonitzada dels dipòsits quaternaris del Geotreball I (GT I). La cartografia és contínua. S’interpreta la
     distribució de les unitats quaternàries cobertes per dipòsits antròpics, segons un model d’unitats geològiques.
      No inclou els materials d’alteració superficial de les unitats prequaternàries. Els elements que inclou la capa 
      s’estructuren en 3 conjunts d’informació: unitats geològiques; contactes i elements geomorfològics. Cada unitat 
      cartogràfica s’identifica amb un epígraf que es caracteritza per un color i en algun cas també per una trama. En 
      futures versions s’adjuntarà l’equivalència entre els epígrafs publicats als fulls MGC25m i els epígrafs actualitzats. 
      <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/QUAT_LLEG">Veure llegenda de signes convencionals</a>.  </p>


{/if}
{#if groupLabel==="Talls geològics"}

<p>Representació gràfica de la intersecció dels cossos geològics en el subsòl amb un pla vertical d'una orientació determinada. 
    De la intersecció d’aquest pla amb la superfície topogràfica en resulta la línia de la traça del tall. La present versió 
    permet visualitzar i descarregar talls geològics del Geotreball I (GT I). Cada tall representa una aproximació de la 
    distribució dels materials geològics en fondària, seguint un model d’unitats geològiques, coherent amb la informació de 
    superfície i de subsòl disponible.  <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/TALLS_LLEG">Veure llegenda de signes convencionals.</a>. 
    </p>


{/if}
{#if groupLabel==="Registre geològic"}

<p>La capa Registre Geològic inclou esquemes representatius de les successions litostratigràfiques d’àmbits geogràfics específics. 
    La present versió de la capa Registre Geològic permet visualitzar i descarregar Columnes estratigràfiques sintètiques 
    i Esquemes de relacions estratigràfiques del Geotreball I (GT I).<br />
    Les Columnes estratigràfiques són representatives de les successions de roques sedimentàries i volcàniques presents a l’àmbit d’un mapa. 
    S’inclouen columnes representatives del Neogen, Paleogen, Mesozoic i Paleozoic.
    <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/REL_LLEG">Veure llegenda</a>.  <br />
    Els Esquemes de relacions estratigràfiques són una representació gràfica sintètica de la posició cronoestratigràfica i estructural 
    de les diferents unitats geològiques presents a l’àmbit d’un mapa.
         <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/COLS_LLEG">Veure llegenda de signes convencionals</a>.  
    </p>


{/if}
{#if groupLabel==="Terrenys antropitzats"}

<p>Cartografia harmonitzada de terrenys antropitzats dels Geotreball I (GT I) i Geotreball II (GT II). El concepte terreny 
    antropitzat es refereix a aquelles àrees on l’activitat humana ha modificat la configuració natural del terreny 
    significativament. A la present versió es diferencien 3 tipologies de terrenys antropitzats: terrenys terraplenats, 
    terrenys rebaixats i terrenys modificats. Cada tipologia inclou diferents unitats identificades mitjançant un epígraf. 
    <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/ANT_LLEG">Veure llegenda</a>.  </p>


{/if}
{#if groupLabel==="Mesures d'estructures"}

<p>Mesures de diferents tipus d’estructures de caràcter puntual del Geotreball I (GT I). Cada tipologia d’estructura té 
    un símbol específic que s’orienta en funció de la direcció de màxim pendent en el cas de les estructures planars 
    (estratificació i foliació), i la direcció en el cas de les estructures lineals. L’orientació de les estructures es 
    proporciona a partir de la mesura de l’azimut (de 0 a 360º en sentit horari) i la inclinació respecte el pla horitzontal 
    de la direcció de màxim pendent. En el cas de la lineació d’intersecció es proporciona l’azimut i la inclinació respecte 
    el pla horitzontal. En les mesures del sentit del paleocorrent només es proporciona l’azimut. La majoria d’orientacions 
    s’han mesurat al camp amb la brúixola, en afloraments específics. 
    <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/MESU_LLEG">Veure llegenda de signes convencionals</a>. 
    </p>


{/if}
<!-- <IconButton style="position:fixed;left:24.5em" on:click={letfalse}>
    <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
  
  </IconButton> -->
</div>
</div>
{/if}