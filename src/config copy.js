export const mapBoxAccessToken = "";
export const keyApp = {};

export const baseLayers = [
  {
    label: "topo",
    image:
      "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/img/Terreny_hibrid_12228.jpg",
    url:
      "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/styles/topo_mprg.json",
  },

  {
    label: "toposimple",
    image:
      "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/img/toposimple.png",
    url:
      "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/styles/toposimple_mprg.json",
  },

  {
    label: "orto",
    image:
      "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/img/Orto_hibrida_12228.jpg",
    url:
      "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/styles/hibrid_mprg.json",
  },

  // {
  //   label: "geologic",
  //   image:
  //     "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/img/geologic.png",
  //   url:
  //     "https://tilemaps.icgc.cat/tileserver/styles/mprg-styles/styles/geologic_mprg.json",
  // },
];

export const layerTree = [
  {
    groupLabel: "Perillositat",
    groupId: "opt_perillositat",
    items: [
      { label: "Multiperillositat", value: "perillositat_T" },
      { label: "Despreniments", value: "P_despreniments" },
      { label: "Esllavissades", value: "P_esllavissades" },
      { label: "Esfondraments", value: "P_esfondraments" },
      { label: "Fluxos torrencials", value: "P_cons" },
      { label: "Allaus", value: "p_allaus" },
      { label: "Inundabilitat (ZPSCG)", value: "P_inundabilitat" },
    ],
  },
  {
    groupLabel: "Despreniments",
    groupId: "opt_despreniments",
    items: [
      { label: "Inventari (pt)", value: "inv_despreniments_pt" },
      { label: "Inventari (ln)", value: "inv_despreniments_ln,inv_despreniments_ptdirec"},
      { label: "Inventari (pl)", value: "inv_despreniments_pl" },
    ],
  },
  {
    groupLabel: "Esllavissades",
    groupId: "opt_esllavissades",
    items: [
      { label: "Inventari (pt)", value: "inv_esllavissades_pt" },
      { label: "Inventari (ln)", value: "inv_esllavissades_ln,inv_esllavissades_ptdirec"},
      { label: "Inventari (pl)", value: "inv_esllavissades_pl" },
    ],
  },
  {
    groupLabel: "Fluxos",
    groupId: "opt_fluxos",
    items: [
      { label: "Inventari (pt)", value: "inv_fluxos_pt" },
      { label: "Inventari (ln)", value: "inv_fluxos_ln,inv_fluxos_ptdirec"},
      { label: "Inventari (pl)", value: "inv_fluxos_pl" },
    ],
  },

  {
    groupLabel: "Esfondraments",
    groupId: "opt_esfondraments",
    items: [
      { label: "Inventari (pt)", value: "inv_esfondraments_pt" },
      { label: "Inventari (pl)", value: "inv_esfondraments_pl" },
    ],
  },

  {
    groupLabel: "Altres Indicis",
    groupId: "opt_altresindiciss",
    items: [
      { label: "Altres indicis activitat (pt)", value: "altresindicis_pt" },
      { label: "Altres indicis activitat (ln)", value: "altresindicis_ln" },
      { label: "Altres indicis activitat (pl)", value: "altresindicis_pl" },
    ],
  },
];
