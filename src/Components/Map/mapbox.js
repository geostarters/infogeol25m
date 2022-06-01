

import mapbox from 'mapbox-gl';
import { mapBoxAccessToken } from "../../config";
// https://docs.mapbox.com/help/glossary/access-token/
mapbox.accessToken = mapBoxAccessToken;;

const key = {};

export { mapbox, key };