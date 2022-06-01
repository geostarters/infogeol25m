<script>
  import { stateDrawer } from "../../Utils/stores.js";
  import PanelSearchBar from "../PanelSearchBar/PanelSearchBar.svelte";
  import Modal from "../../UI/Modal.svelte";
  import ModalInfo from "../../UI/ModalInfo.svelte";
  import Logo from "../../UI/Logo.svelte";
  import Title from "./Title.svelte"
  import TopAppBar, {
    Row,
    Section,
       FixedAdjust,
    DenseFixedAdjust,
    ProminentFixedAdjust,
    ShortFixedAdjust
  } from "@smui/top-app-bar";
  import IconButton from "@smui/icon-button";
  let dense = false;
  let prominent = false;
  let variant = "fixed";
  let collapsed = false;


  let Adjust = ShortFixedAdjust;

  export let show = false;
  let modal_show = false;
  let modalinfovisor_show = false;
  // setTimeout(() => {
  //   modalinfovisor_show = true
  //   }, 2000);
  function changeDrawerState() {
    stateDrawer.set(function() {
      return true;
    });
  }

  function openInfoDialog() {
    openModalInfo = true;
  }
</script>

<style>
  .topAppBar{
    border-radius: 10;
  }
  #titulo {
    /* font-size: 1.82em !important; */
    font-size: 22px;
    padding-left: 72px;
    padding-bottom: 9px;
  }
  .logos{
    right: 0;
  }
  @media (max-width: 624px) {
    #titulo {
      font-size: 1.5rem !important;
    }
  }
  @media (max-width: 500px) {
    #titulo {
      font-size: 1rem !important;
    }
  }
  @media (max-width: 321px) {
    #titulo {
      font-size: 0.9rem !important;
    }
  }
  @media (max-width: 775px) {
    .btinfor {
      opacity: 0 !important;
    }
  }
</style>

<Modal bind:show={modal_show} />
<ModalInfo bind:show={modalinfovisor_show} />
<div class="top-app-bar-container flexor">
  <TopAppBar class="topAppBar" variant="short" {dense} {prominent} bind:collapsed>
    <Row>
    
       <!-- <Section> 
          <PanelSearchBar />
      
       </Section> -->

      <Section id="titulo" style="padding-left: 55px;">
        
        <Title />
          
         <!-- <Logo />   -->
         <IconButton
         on:click={() => {
           modalinfovisor_show = true;
           modal_show = false;
           show = false;
         }}
         id="topbarInfovisor"
         style="color:black"
         class="btinfo material-icons"
         aria-label="Informació del Visor">
         help
       </IconButton>
         <IconButton
          on:click={() => {
            modal_show = true;
            show = false;
            modalinfo_show = false;
          }}
          id="topbarInfo"
          style="color:black"
          class="btinfo material-icons"
          aria-label="Informació">
          info
        </IconButton>
           
   
   
      </Section>

      <!-- <Section align="end" toolbar class="btinfor"> -->


      <!-- </Section> -->
    </Row>
  </TopAppBar>
  <div use:Adjust />
</div>
