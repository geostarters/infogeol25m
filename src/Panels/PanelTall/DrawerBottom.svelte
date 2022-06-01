
 <script>
  import Drawer, {AppContent, Content, Header, Title, Subtitle, Scrim} from '@smui/drawer';
  import Button, {Label} from '@smui/button';
  import List, {Item, Text, Graphic, Separator, Subheader} from '@smui/list';
  import H6 from '@smui/common/H6.svelte';
  import CrossSection from './CrossSection.svelte'
  import IconButton, { Icon } from "@smui/icon-button";
  export let selected;
export let typedata;
export let linkjpg;

//  console.log('pip', selected, linkjpg)

</script>

<style>
#container{
  z-index: 2;
  position: absolute;
 
 bottom: -7px;
  max-height: 248px;
  width: 100%;
  background-color: rgba(255,255,255,.9);
  
}
</style>

<div id="container">
    
<CrossSection {selected} {linkjpg} typedata={typedata}/>



     
    </div>

     