export default class CompassControl {
    constructor() {
        //https://github.com/russss/mapboxgl-layer-switcher/blob/main/index.js
        this.map_ = null;
       // this.map_ = null;
        this.bearingIcon = null;
    }
    onAdd(map) {
        this.map_ = map;
        this.container_ = document.createElement('div');
        this.container_.className = 'control-bearing';
        this.bearingIcon = document.createElement('div');
        this.bearingIcon.className = 'compass';
        this.bearingIcon.addEventListener('click', () => {
            this.map_.flyTo({
                bearing: 0,
                duration: 500
            });
            this.bearingIcon.style.transform = 'rotate(0deg)';
            this.bearingIcon.style.transition = '0.5s';
        });
        const btEast = document.createElement('div');
        btEast.className = 'bearing-east';
        btEast.addEventListener('click', () => {
            const mapBearing = this.map_.getBearing() + 9;
            this.map_.flyTo({
                bearing: mapBearing,
                duration: 250
            });
            this.bearingIcon.style.transform = 'rotate(' + (mapBearing * -1) + 'deg)';
        });
        const btWest = document.createElement('div');
        btWest.className = 'bearing-west';
        btWest.addEventListener('click', () => {
            const mapBearing = this.map_.getBearing() - 9;
            this.map_.flyTo({
                bearing: mapBearing,
                duration: 250
            });
            this.bearingIcon.style.transform = 'rotate(' + (mapBearing * -1) + 'deg)';
        });
        this.container_.appendChild(this.bearingIcon);
        this.container_.appendChild(btEast);
        this.container_.appendChild(btWest);
        this.map_.on('pitch', this.setChangeOrientation.bind(this));
        return this.container_;
    }
    onRemove() {
        this.container_.parentNode.removeChild(this.container_);
        this.map_ = undefined;
    }
    setChangeOrientation() {
        const mapBearing = this.map_.getBearing();
        this.bearingIcon.style.transform = 'rotate(' + mapBearing + 'deg)';
    }
    hide() {
        this.container_.style.display = 'none';
    }
    show() {
        this.container_.style.display = 'inline-block';
    }
}
