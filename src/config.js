export const mapBoxAccessToken = "pk.eyJ1IjoiaW5mb2dlb2dlb3N0YXJ0IiwiYSI6ImNrdHNnOGJkeTFmdnQydW1wZmp1amxzNDIifQ.SNA6XHEPjyxynwsHbZCDNw";
export const keyApp = {};
export const urlTerrainICGC = "https://geoserveis.icgc.cat/vector-tiles/terreny_icgc_5m_rgb/{z}/{x}/{y}.png";

export const baseLayers = [
  {
    label: "Topogràfic",
    image:
      "https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/style/img/Terreny_hibrid_12228.jpg",
    url:
      "https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/style/styles/topo_infogeo2.json",
  },

  {
    label: "Ortoimatge",
    image:
      "https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/style/img/Orto_hibrida_12228.jpg",
    url:
      "https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/style/styles/hibrid_infogeo.json",
  },
  // {
  //   label: "Estructural (1:250 000)",
  //   image:
  //     "https://tilemaps.icgc.cat/tileserver/geoindex/infogeo/style/img/estructural.jpg",
  //   url:
  //     "estructuralwms",
  // },
];



export const columnes = [
  {
    groupLabel: "Columnes estratigràfiques",
    groupId: "opt_columnes",
    items: [
      { label: "Neogen", value: "Neogen LINK,Neogen NO LINK" },
      { label: "Paleogen", value: "Paleogen LINK,Paleogen NO LINK" },
      { label: "Mesozoic", value: "Mesozoic NO LINK,Mesozoic LINK" },
      { label: "Paleozoic", value: "Paleozoic NO LINK,Paleozoic LINK" }
    ],
  },
]

export const layerTree = [
  {
    groupLabel: "Dipòsits quaternaris",
    groupId: "opt_quaternari",
    items: [
      // { label: "Ornamentació", value: "gt125mv10sh0fol1r010_202101,gt125mv10sh0fop1r010_202101,gt125mv10sh0fol1r010_202101_punts" },
      { label: "Elements geomorfològics", value: "Elements geomorfològics" },
      { label: "Contactes", value: "Contactes del quaternari" },
      { label: "Unitats geològiques", value: "FILLq,PATT1q,LABELq/label"},
      
    ],
  },
  // {
  //   groupLabel: "Dipòsits quaternaris",
  //   groupId: "opt_quaternari",
  //   items: [
  //     // { label: "Ornamentació", value: "gt125mv10sh0fol1r010_202101,gt125mv10sh0fop1r010_202101,gt125mv10sh0fol1r010_202101_punts" },
  //     { label: "Elements geomorfològics", value: "Elements geomorfològics" },
  //     { label: "Contactes", value: "Contactes del quaternari" },
  //     { label: "Unitats geològiques", value: "Unitats geològiques del quaternari,Unitats geològiques del quaternari/label" },
      
  //   ],
  // },
  {
    groupLabel: "Basament prequaternari",
    groupId: "opt_basament",
    items: [
      { label: "Contactes", value: "Contactes del basament" },
      { label: "Falles i plecs", value: "gt125mv10sh0ffl1r010_202101,gt125mv10sh0ffl1r010_202101_5513"},
      { label: "Unitats geològiques", value: "FILL,PATT1,PATT2,PATT3,PATT4,LABEL/label"},
      
    ],
  },
  // {
  //   groupLabel: "Basament prequaternari",
  //   groupId: "opt_basament",
  //   items: [
  //     { label: "Contactes", value: "Contactes del basament" },
  //     { label: "Falles i plecs", value: "gt125mv10sh0ffl1r010_202101,gt125mv10sh0ffl1r010_202101_5513"},
  //     { label: "Unitats geològiques", value: "Unitats geològiques del basament,Unitats geològiques del basament/label"},
      
  //   ],
  // },
  // {
  //   groupLabel: "Terrenys antropitzats",
  //   groupId: "opt_antropics",
  //   items: [
  //     { label: "Terraplens en obres viàries", value: "Explanacions en obres viàries,Explanacions en obres viàries/label" },
  //     { label: "Terraplens d'infraestructura costanera", value: "Terraplens d'infraestructures costaneres,Terraplens d'infraestructures costaneres/label" },
  //     { label: "Valls i zones deprimides reblertes", value: "Valls i zones deprimides reblertes,Valls i zones deprimides reblertes/label" },
  //     { label: "Dipòsits d'abocadors de residus", value: "Dipòsits d'abocadors de residus,Dipòsits d'abocadors de residus/label" },
  //     { label: "Rebliments indiferenciats", value: "Rebliments indiferenciats,Rebliments indiferenciats/label" },
  //     { label: "Zones extractives a cel obert", value: "Zones extractives a cel obert,Zones extractives a cel obert/label" },
  //     { label: "Desmunts en obres viàries", value: "Desmunts en obres viàries,Desmunts en obres viàries/label" },
  //     { label: "Explanacions en obres viàries", value: "Terraplens en obres viàries,Terraplens en obres viàries/label" }
  //   ],
  // },
  {
    groupLabel: "Terrenys antropitzats",
    groupId: "opt_antropics",
    items: [
      { label: "Terrenys modificats", value: "Terrenys modificats,Terrenys modificats/label" },
      { label: "Terrenys rebaixats", value: "Terrenys rebaixats,Terrenys rebaixats/label" },
      { label: "Terrenys terraplenats", value: "Terrenys terraplenats,Terrenys terraplenats/label" },

    ],
  },
  {
    groupLabel: "Mesures d'estructures",
    groupId: "opt_mesures",
    items: [
      { label: "Estratificació", value: "Estratificació" },
      { label: "Foliació regional varisca", value: "Foliació regional varisca" },
      { label: "Lineació d'intersecció entre l'estratificació i la foliació regional varisca", value: "Lineació d'intersecció entre l'estratificació i la foliació regional varisca" },
      { label: "Sentit de paleocorrent", value: "Sentit de paleocorrent" },
     
    ],
  },

  {
    groupLabel: "Talls geològics",
    groupId: "opt_elements",
    items: [
      { label: "Traces de talls geològics", value: "Traces de talls geològics" }
     
    ],
  },


  {
    groupLabel: "Registre geològic",
    groupId: "opt_registre",
    items: [
      { label: "Esquemes relacions estratigràfiques", value: "Esquemes de relacions estratigràfiques,Esquemes de relacions estratigràfiques/label" },
      { label: "Columnes estratigràfiques", value: "Paleozoic NO LINK,Paleozoic LINK,Mesozoic NO LINK,Mesozoic LINK,Columnes del Paleozoic,Columnes del Mesozoic,Paleogen LINK,Paleogen NO LINK,Neogen LINK,Neogen NO LINK" },
      // { label: "Esquemes relacions estratigràfiques", value: "Esquemes de relacions estratigràfiques" }
     
    ],
  },








  // {
  //   groupLabel: "Dipòsits Quaternaris",
  //   groupId: "opt_quaternari",
  //   items: [
  //     // { label: "Ornamentació", value: "gt125mv10sh0fol1r010_202101,gt125mv10sh0fop1r010_202101,gt125mv10sh0fol1r010_202101_punts" },
  //     { label: "Elements geomorfològics", value: "Elements geomorfològics" },
  //     { label: "Contactes", value: "Contactes:1" },
  //     { label: "Unitats geològiques", value: "Unitats geològiques del quaternari,Unitats geològiques del quaternari/label" },
      
  //   ],
  // },

  // {
  //   groupLabel: "Talls Geològics",
  //   groupId: "opt_elements",
  //   items: [
  //     { label: "Traces de Talls Geològics", value: "Talls geològics,Talls geològics/label" }
     
  //   ],
  // },
  // {
  //   groupLabel: "Registre Geològic",
  //   groupId: "opt_registre",
  //   items: [
  //     { label: "Columnes estratigràfiques", value: "Paleozoic NO LINK,Paleozoic LINK,Mesozoic NO LINK,Mesozoic LINK,Columnes del Paleozoic,Columnes del Mesozoic,Paleogen LINK,Paleogen NO LINK,Neogen LINK,Neogen NO LINK" },
  //     { label: "Esquemes relacions estratigràfiques", value: "Esquemes de relacions estratigràfiques" }
     
  //   ],
  // },

  // {
  //   groupLabel: "Terrenys antropitzats",
  //   groupId: "opt_antropics",
  //   items: [
  //     { label: "Terraplens en obres viàries", value: "Explanacions en obres viàries,Explanacions en obres viàries/label" },
  //     { label: "Terraplens d'infraestructura costanera", value: "Terraplens d'infraestructures costaneres,Terraplens d'infraestructures costaneres/label" },
  //     { label: "Valls i zones deprimides reblertes", value: "Valls i zones deprimides reblertes,Valls i zones deprimides reblertes/label" },
  //     { label: "Dipòsits d'abocadors de residus", value: "Dipòsits d'abocadors de residusDipòsits d'abocadors de residus/label" },
  //     { label: "Rebliments indiferenciats", value: "Rebliments indiferenciats,Rebliments indiferenciats/label" },
  //     { label: "Zones extractives a cel obert", value: "Zones extractives a cel obert,Zones extractives a cel obert/label" },
  //     { label: "Desmunts en obres viàries", value: "Desmunts en obres viàries,Desmunts en obres viàries/label" },
  //     { label: "Explanacions en obres viàries", value: "Terraplens en obres viàries,Terraplens en obres viàries/label" }
  //   ],
  // },
  // {
  //   groupLabel: "Mesures d'estructures",
  //   groupId: "opt_mesures",
  //   items: [
  //     { label: "Estratificació", value: "Estratificació" },
  //     { label: "Foliació regional varisca", value: "Foliació regional varisca" },
  //     { label: "Lineació d'intersecció entre l'estratificació i la foliació regional varisca", value: "Lineació d'intersecció entre l'estratificació i la foliació regional varisca" },
  //     { label: "Sentit de paleocorrent", value: "Sentit de paleocorrent" },
     
  //   ],
  // },
  // {
  //   groupLabel: "Quaternari",
  //   groupId: "opt_quaternari",
  //   items: [
  //     { label: "Ornamentació", value: "gt1v20sh0ol1r010,gt1v20sh0op1r010" },
  //     { label: "Elements geomorfològics", value: "gt1v20sh0ml1r010" },
  //     { label: "Contactes", value: "gt1v20sh0ql1r010" },
  //     { label: "Unitats geològiques", value: "gt1v20sh0qp1r010,gt1v20sh0qp1r010/label" },
      
  //   ],
  // },
  // {
  //   groupLabel: "Basament pre-Quaternari",
  //   groupId: "opt_basament",
  //   items: [
  //     { label: "Contactes", value: "gt1v20sh0bl1r010" },
  //     { label: "Falles i plecs", value: "gt1v20sh0fl1r010"},
  //     { label: "Unitats geològiques", value: "gt1v20sh0bp1r010,gt1v20sh0bp1r010/label"},
      
  //   ],
  // },
  // {
  //   groupLabel: "Altres elements",
  //   groupId: "opt_elements",
  //   items: [
  //     { label: "Traces de Talls Geològics", value: "TRACES_TALLS,TRACES_TALLS/label" }
     
  //   ],
  // },

];
