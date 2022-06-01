<script>
      import IconButton, { Icon } from "@smui/icon-button";
    export let groupLabel;
    export let showinfo;
    import { onMount } from "svelte";
    onMount(async() => {
        // console.log('oo', showinfo)
        
    })
    function letfalse () {
        // console.log('entro inii', showinfo)
showinfo=false
// console.log('entro final', showinfo)
    }

</script>

<style>

    .infoboxQt{
        position: fixed;
        top:200px;
    /* top: 10%; */
    left: 22em;
    width: 39em;
    background-color: white;
    border-radius: 15px;
    padding: 14px;
    }
    
    .infoboxBs{
        position: fixed;
        top:200px;
        /* top:28%; */
        left: 22em;
    width: 39em;
    background-color: white;
    border-radius: 15px;
    padding: 14px;
    }
    
    .infoboxTalls{
        position: fixed;
        top:200px;
    /* top: 49%; */
    left: 22em;
    width: 39em;
    background-color:white;
    border-radius: 15px;
    padding: 14px;
    }
</style>

{#if showinfo}
<div>
    {#if groupLabel==="Basament pre-Quaternari"}
<div class="infoboxBs">
    <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4>
<p>Cartografia harmonitzada del Basament prequaternari derivada dels fulls publicats del Mapa geològic de Catalunya 1:25 000 (MGC25m) 
    en el marc del Geotreball I (GT I). La cartografia és contínua i s’interpreta la distribució de les unitats de basament que es 
    troben cobertes per dipòsits quaternaris o antròpics, segons un model d’unitats geològiques. Els elements que conformen la capa
     s’estructuren en 3 conjunts d’informació: les unitats geològiques; els contactes (sedimentaris, metamòrfics i magmàtics); i 
     les falles i els plecs. Cada unitat cartogràfica, s’identifica amb un epígraf, i en el mapa es caracteritza per un color, i 
     en algun cas també per una trama. Per cada unitat de basament es pot consultar la informació relativa a les característiques 
     litològiques i cronoestratigràfiques vinculades al full del MG25m que correspon. En futures versions s’adjuntarà l’equivalència 
     entre els epígrafs publicats als fulls MGC25m i els epígrafs harmonitzats que conformen la cartografia contínua que aquí s’exposa. 
     Podeu accedir a la llegenda signes convencionals de la cartografia del Basament a través d’aquest 
     <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/BAS_LLEG">enllaç</a>. 

</p>

</div>
{/if}


{#if groupLabel==="Dipòsits Quaternaris"}
<div class="infoboxQt">
    <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4>
<p>Cartografia harmonitzada dels dipòsits quaternaris dels fulls del Mapa geològic de Catalunya 1:25 000 (MGC25m) en el marc del 
    Geotreball I (GT I). La capa és contínua, s’interpreta la distribució de les unitats quaternàries que es troben cobertes per dipòsits antròpics, 
    segons un model d’unitats geològiques. No inclou els materials d’alteració superficial de les unitats prequaternàries. Els elements que 
    inclou la capa s’estructuren en 3 conjunts d’informació: les unitats geològiques; els contactes i els elements geomorfològics. Cada unitat 
    cartogràfica, s’identifica amb un epígraf, i en el mapa es caracteritza per un color, i en algun cas també per una trama. Per cada unitat 
    quaternària es pot consultar la informació relativa a la seva fàcies i les característiques litològiques i cronoestratigràfiques vinculades 
    al full del MGC25m que correspon. En futures versions s’adjuntarà l’equivalència entre els epígrafs publicats als fulls MGC25m i els epígrafs 
    harmonitzats que conformen la cartografia contínua que aquí s’exposa. Podeu accedir a la llegenda signes convencionals de la cartografia del 
    Quaternari a través d’aquest      <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/QUAT_LLEG">enllaç</a>.  </p>

</div>
{/if}
{#if groupLabel==="Talls geològics"}
<div class="infoboxTalls">
    <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4>
<p>Representació gràfica de la intersecció dels cossos geològics en el subsòl amb un pla vertical d'una orientació determinada. De la 
    intersecció d’aquest pla amb la superfície topogràfica en resulta la línia de la traça del tall. Aquests talls geològics són derivats dels 
    fulls publicats del Mapa Geològic de Catalunya 1:25 000. Cada tall representa una aproximació de la distribució dels materials geològics en fondària, 
    seguint un model d’unitats, coherent amb la informació de superfície i de subsòl disponible. En el mapa es mostren les traces dels talls disponibles. 
    Clicant a cada traça es pot visualitzar o descarregar el tall geològic corresponent. 
    La descàrrega inclou el tall en format jpg i una taula en format xlsx, amb informació litostratigràfica de les unitats que el composen. 
    Podeu accedir a la llegenda signes convencionals dels talls geològics a través d’aquest <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/TALLS_LLEG">enllaç</a>. 
    </p>

</div>
{/if}
{#if groupLabel==="Registre Geològic"}
<div class="infoboxBs">
    <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4>
<p>La capa Registre Geològic inclou esquemes representatius de les successions litostratigràfiques d’àmbits geogràfics específics. 
    La present versió de la capa Registre Geològic permet visualitzar o descarregar columnes estratigràfiques sintètiques i esquemes 
    de relacions estratigràfiques dels fulls publicats del Mapa Geològic de Catalunya 1:25 000.<br />
    Les columnes estratigràfiques són representatives de les successions de roques sedimentàries i volcàniques presents a l’àmbit d’un full. 
    S’inclouen columnes representatives del registre neogen, paleogen, mesozoic i paleozoic. Per facilitar l’accés i l’anàlisi a les columnes 
    es mostra un mapa de la distribució d’aquests quatre grups cronoestratigràfics. Clicant a l’àmbit d’interès l’usuari pot visualitzar o 
    descarregar la columna corresponent. La descàrrega inclou la columna estratigràfica en format jpg i una taula en format xlsx, amb 
    informació litostratigràfica de les unitats que la composen.<br />
    Els esquemes de relacions estratigràfiques són una representació gràfica sintètica de la posició cronoestratigràfica i estructural de les 
    diferents unitats geològiques presents a l’àmbit d’un full 1.25 000. Clicant a un punt determinat l’usuari pot visualitzar o descarregar 
    l’esquema de relacions estratigràfiques representatiu del full on se situa el punt. La descàrrega inclou l’esquema de relacions estratigràfiques 
    en format jpg i una taula en format xlsx, amb informació litostratigràfica de les unitats que el composen. Podeu accedir a la llegenda 
    general dels esquemes de relacions estratigràfiques a través d’aquest <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/REL_LLEG">enllaç</a>.  <br />
    Es recomana carregar de fons la cartografia geològica de Basament. Podeu accedir a la llegenda general de les columnes estratigràfiques 
    sintètiques i a la llegenda de signes convencionals per a les columnes i els esquemes de relacions estratigràfiques a través 
    d’aquest      <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/COLS_LLEG">enllaç</a>.  
    </p>

</div>
{/if}
{#if groupLabel==="Terrenys antropitzats"}
<div class="infoboxQt">
    <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4>
<p>Cartografia harmonitzada de Terrenys antropitzats derivada dels fulls publicats del Mapa Geològic de Catalunya 1:25 000 en el marc del 
    projecte Geotreballs I (GT I) i Geotreball II (GT II). El concepte terreny antròpic es refereix a aquelles àrees on l’activitat 
    humana ha modificat la configuració natural del terreny significativament. A la present versió la capa diferencia 8 tipologies de 
    Terrenys antropitzats: els terraplens, desmunts i explanacions d’obres viàries, les zones extractives a cel obert, els terraplens 
    d’infraestructures costaneres, els dipòsits d’abocadors de residus, les valls i zones deprimides reblertes i els rebliments en 
    general. Cada tipologia s’identifica mitjançant un epígraf. Es pot consultar la descripció dels Terrenys antropitzats clicant al 
    damunt d’ells. Podeu accedir a la llegenda dels Terrenys antropitzats a través d’aquest      <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/ANT_LLEG">enllaç</a>.  </p>

</div>
{/if}
{#if groupLabel==="Mesures d'estructures"}
<div class="infoboxTalls">
    <IconButton style="position:fixed;left:39.5em" on:click={letfalse}>
        <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
      
      </IconButton>
<h4>{groupLabel}</h4>
<p>Mesures de l’orientació de diferents tipus d’estructures de caràcter puntual derivades dels fulls publicats del Mapa Geològic de Catalunya 1:25 000.<br />
    A la present versió s’inclou mesures de quatre tipologies d’estructures: l’estratificació, la foliació regional varisca, la lineació d’intersecció 
    entre l’estratificació i la foliació regional varisca, i el sentit dels paleocorrents. Cada tipologia d’estructura té un símbol específic que 
    s’orienta en funció de la direcció de màxim pendent en el cas de les estructures planars (estratificació i foliació) i la direcció en el cas 
    de les estructures linears. L’orientació de les estructures planars es proporciona a partir de la mesura de l’azimut (de 0 a 360º en sentit horari) 
    i la inclinació respecte el pla horitzontal (cabussament) de la direcció de màxim pendent del pla. Les inclinacions negatives indiquen plans invertits. 
    En el cas de la lineació d’intersecció es proporciona l’azimut i la inclinació respecte el pla horitzontal. En les mesures del sentit del paleocorrent 
    només es proporciona l’azimut.<br />
    La majoria d’orientacions s’han mesurat al camp, en afloraments específics amb la brúixola. També s’inclouen mesures de caràcter més regional 
    obtingudes a partir de la intersecció de les traces cartogràfiques amb la superfície del terreny. Clicant a les mesures es proporciona 
    informació sobre l’orientació i la unitat geològica a la que està associada. Podeu accedir a la llegenda general de signes convencionals 
    de les mesures d’estructures a través d’aquest      <a target="_blank" href="https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/dades/llegendes/MESU_LLEG">enllaç</a>. 
    </p>

</div>
{/if}
<!-- <IconButton style="position:fixed;left:24.5em" on:click={letfalse}>
    <Icon style="font-size: 25px; " class=" material-icons  "> close </Icon>
  
  </IconButton> -->
</div>
{/if}