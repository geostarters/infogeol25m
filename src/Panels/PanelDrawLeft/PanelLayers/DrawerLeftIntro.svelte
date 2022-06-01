
 <script>
  import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
  import Button, {Label} from '@smui/button';
  import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
  import H6 from '@smui/common/H6.svelte';
  //import PanelIntro from './PanelIntro.svelte';
  import { createEventDispatcher } from 'svelte';
  import { stateDrawerIntro } from "../../../Utils/stores.js";
  const dispatch = createEventDispatcher();
  let clicked = 'nothing yet';
  let myDrawer;
  let myDrawerOpen = false;
  let active = 'Gray Kittens';
  let myDrawer2;
  
  export let myDrawer2Open = false;
  let active2= 'Inbox';

  function setActive(value) {
    active = value;
    myDrawerOpen = false;
  }

  function setActive2(value) {
    active2 = value;
    //myDrawer2Open = false;
    console.info(myDrawer2Open);
  }


 const unsubscribe = stateDrawerIntro.subscribe(value => {
		myDrawer2Open = value;
	});


</script>

<style>
#sideBt {
  position: absolute;
  left: 0;
  top: 64px;
  width: 23px;
  height: 48px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.9) url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAQAAAAXDMSnAAAAi0lEQVR4AX3JQcqBURQG4O/+9WNG30D3vOfSDTuQsgcZyBakZANSzMVMBme3zsBI5/VMn4ZKLP5ki1E4tYejWpilxVUtzOEUD68odYmXR5BJNp/4zllXD2phllYvamHmirsayUkfJ5ruHzueTldC08kcT5YOY9xYujqQM03XKXuaLmEtNF1e1Nz89gbL+0do6OEwRwAAAABJRU5ErkJggg==) 7px center/7px 10px no-repeat;
  border-left: 1px solid #D4D4D4;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  transition: 0.5s;
  display: block;
  z-index: 111000;
}
.listclass{
  opacity: 0;
}
:global(.mdc-drawer__header){
  background-color: rgba(54,80,84,0.7);
  
}
:global(.mdc-drawer .mdc-drawer__title ){
  
  color: white;
  font-weight: lighter;
}
:global(.mdc-drawer .mdc-drawer__subtitle ){
  
  color: white;
  font-weight: lighter;
  font-style: italic;
}
/* .mdc-drawer--modal {
    box-shadow: 0 8px 10px -5px rgba(0,0,0,.2), 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12);
    
    right: auto;
    display: none;
    position: fixed;
    z-index: 3;
}
.mdc-drawer {
    opacity: 0.86 !important;
    background-color: #fff;
    border-radius: 0 0 0 0;
    z-index: 6;
    width: 256px;
    top: 64px;
    
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    box-sizing: border-box;
    height: 100%;
    border-right: 1px solid;
    border-color: rgba(0,0,0,.12);
    overflow: hidden;
    transition-property: transform;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
}
#drawerIntro{
  position: absolute;
  top: 66px;
} */

</style>

<div id="container-left5">
      <Drawer  variant="modal" bind:this={myDrawer2} bind:open={myDrawer2Open} style="
    
    position: absolute;
    left: 24px;
    top: 64px;
">
        <!-- <Header>
          <Title>Introducció</Title>
           <Subtitle></Subtitle> 
        </Header> -->
        <Content>
        <!-- <PanelIntro /> -->
          <List class="listclass"><Item />
          </List>
        </Content>
      </Drawer>

      <Scrim />
     
    </div>
 
     
    
 
