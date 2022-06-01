<script context="module">
    export function miraCentreDins(x, y, z) {
      // 0.0000, 38.5000, 6.0000, 62.3300 (25831)
      var x0 = 0.0; //0.7525
      var y0 = 38.5; // 40.5263
      var x1 = 6.0; // 3.3563
      var y1 = 62.33; // 42.3748
      if (z < 10) {
        return false;
      } else if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
        return true;
      } else {
        return false;
      }
    }
  
    export function getFirstSymbolLayerId(layers) {
      let layer = "background";
  
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type == "symbol") {
          layer = layers[i].id;
  
          return layer;
        }
      }
    }
  </script>
  