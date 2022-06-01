<script>
  import { onMount, getContext } from "svelte";
  import mapbox from "mapbox-gl";
  import { keyApp } from "../../config";
  import proj4 from "proj4";

  const { getMap } = getContext(keyApp);
  const map = getMap();

  onMount(async() => {
    map.on("mousemove", function(e) {
      const auxLat = e.lngLat.lat;
      const auxLon = e.lngLat.lng;
      //console.info(auxLat,auxLon)

      proj4.defs([
        [
          "EPSG:25831",
          "+title=ETRS89_utm (m) +proj=utm +zone=31 +ellps=GRS80 +datum=WGS84 +units=m +no_defs"
        ],
        [
          "EPSG:4258",
          "+title=ETRS89_lonlat (long/lat) +proj=longlat +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +no_defs"
        ],
        [
          "UTM",
          "+proj=utm +ellps=GRS80 +datum=nad83 +units=m +no_defs +zone=31U"
        ]
      ]);
      //proj4(fromProjection[, toProjection, coordinates])

      var coords = proj4("EPSG:4258", "UTM", [auxLon, auxLat]);
      var auxX = coords[0];
      var auxY = coords[1];
      //console.info(auxX,auxY)

      document.getElementById("info").innerHTML =
        "UTM-31N (ETRS89)     X:" + auxX.toFixed(1) + "   Y:" + auxY.toFixed(1);
    });
  });
</script>

<style>
  #info {
    display: block;
    position: absolute;
    bottom: 0;
    height: 17px;
    margin: 0 auto;
    width: 266px;
    padding: 2px;
    padding-bottom: 1.5px;
    left: 45%;
    border: none;
    border-radius: 3px;
    font-size: 12px;
    text-align: center;
    color: #222;
    background: hsla(0,0%,100%,.849);
    
  }
</style>


<div id="info" />
