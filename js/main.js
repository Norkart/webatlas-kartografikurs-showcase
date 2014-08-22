/**
 *
 * INTERESTED IN .JS, FME, DATA ANALYSIS, GEOSERVER, POSTGRESQL/POSTGIS, SPATIAL NERDING?
 * CONTACT NORKART AS (http://norkart.no) FOR MORE INFORMATION!
 *
 * DO YOU LOVE OUR TILESETS AND WANT TO USE THEM IN YOUR PROJECTS?
 * CONTACT NORKART AS (http://norkart.no) FOR INFORMATION ON LICENSING FOR NON-COMMERCIAL AND COMMERCIAL USE
 *
 */

$(document).ready(function() {
    //use the 
    map = new WebatlasMap('map', {
        maxZoom: 30,
        customer: 'WA_JS_V3_Coursework'
    });
    //map.removeControl(map.LayerControl)
    map.removeControl(map.zoomControl);
    map.LayerControl._expand();

    map.eachLayer(function(layer) {
        map.removeLayer(layer)
    });

    var wms = L.imageOverlay.wms("http://www.webatlas.no/wms-std-demo", {
        layers: 'Kart',
        format: 'image/png'
    });

    map.addLayer(wms);
    map.LayerControl.addBaseLayer(wms, "Webatlas WMS");

    var sidebar = L.control.sidebar('sidebar', {
        position: 'left'
    });
    map.addControl(sidebar);

    sidebar.show();
    $(".hide-sidebar").click(function() {
        sidebar.hide();
    })


    /*
    var norkartIcon = L.icon({
        iconUrl: 'img/norkartIcon.png',
        iconSize: [15, 20],
        iconAnchor: [7, 10],
    });

    L.marker([63.4410597431246, 10.4027997216313], {
        icon: norkartIcon
    }).addTo(map);
    L.marker([59.8915770986138, 10.5230465046887], {
        icon: norkartIcon
    }).addTo(map);
    L.marker([61.1235647369621, 10.45737117203], {
        icon: norkartIcon
    }).addTo(map);
    L.marker([60.3573913134054, 5.3429104995275], {
        icon: norkartIcon
    }).addTo(map);

    routePoints = [{
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 5
    }, {
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 9
    }, {
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 12
    }, {
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 14
    }, {
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 12
    }, {
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 9
    }, {
        lat: 63.4410597431246,
        lng: 10.4027997216313,
        zoom: 5
    }, {
        lat: 62.320039453318856,
        lng: 9.263877868652344,
        zoom: 9
    }, {
        lat: 62.320039453318856,
        lng: 9.263877868652344,
        zoom: 12
    }, {
        lat: 62.320039453318856,
        lng: 9.263877868652344,
        zoom: 14
    }, {
        lat: 62.320039453318856,
        lng: 9.263877868652344,
        zoom: 10
    }, {
        lat: 62.320039453318856,
        lng: 9.263877868652344,
        zoom: 8
    }];

    nextRoutePoint_index = 0;

    // map.on('', function() {
    //  console.log("event");
    //  nextRoutePoint();
    // })

    nextRoutePoint();
    //setInterval(nextRoutePoint,30000);
    function nextRoutePoint() {
        console.log("next");
        map.setView(new L.LatLng(routePoints[nextRoutePoint_index].lat, routePoints[nextRoutePoint_index].lng), routePoints[nextRoutePoint_index].zoom);
        nextRoutePoint_index += 1;
        if (nextRoutePoint_index >= routePoints.length) {
            nextRoutePoint_index = 0;
        }
    }
    */
});

L.ImageOverlay.WMS = L.ImageOverlay.extend({

    defaultWmsParams: {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.1',
        layers: '',
        styles: '',
        format_options: "dpi:90",
        env: "skygge:yes",
        format: 'image/jpeg',
        transparent: false,
        tiled: false
    },

    initialize: function(url, options) {
        this._baseUrl = url;

        var wmsParams = L.Util.extend({}, this.defaultWmsParams);

        if (options.detectRetina && L.Browser.retina) {
            wmsParams.width = wmsParams.height = this.options.tileSize * 2;
        } else {
            wmsParams.width = wmsParams.height = this.options.tileSize;
        }

        for (var i in options) {
            // all keys that are not ImageOverlay options go to WMS params
            if (!this.options.hasOwnProperty(i)) {
                wmsParams[i] = options[i];
            }
        }

        this.wmsParams = wmsParams;

        L.Util.setOptions(this, options);
    },

    onAdd: function(map) {
        this._bounds = map.getBounds();
        this._map = map;

        var projectionKey = parseFloat(this.wmsParams.version) >= 1.3 ? 'crs' : 'srs';
        this.wmsParams[projectionKey] = map.options.crs.code;

        map.on("moveend", this._reset, this);

        L.ImageOverlay.prototype.onAdd.call(this, map);
    },

    _updateUrl: function() {
        var map = this._map,
            bounds = this._bounds,
            zoom = map.getZoom(),
            crs = map.options.crs,

            topLeft = map.latLngToLayerPoint(bounds.getNorthWest()),
            mapSize = map.latLngToLayerPoint(bounds.getSouthEast()).subtract(topLeft),

            nw = crs.project(bounds.getNorthWest()),
            se = crs.project(bounds.getSouthEast()),

            bbox = [nw.x, se.y, se.x, nw.y].join(','),

            urlParams = {
                width: mapSize.x,
                height: mapSize.y,
                bbox: bbox
            },
            url = this._baseUrl + L.Util.getParamString(L.Util.extend({}, this.wmsParams, urlParams));

        this._url = url;
    },

    _updateImagePosition: function() {
        // The original reset function really just sets the position and size, so rename it for clarity.
        L.ImageOverlay.prototype._reset.call(this);
    },

    _reset: function() {
        this._bounds = this._map.getBounds();

        this._updateUrl();
        L.Util.extend(this._image, {
            src: this._url
        });
    },

    _onImageLoad: function() {
        this.fire('load');

        // Only update the image position after the image has loaded.
        // This the old image from visibly shifting before the new image loads.
        this._updateImagePosition();
    }
});

L.imageOverlay.wms = function(url, options) {
    return new L.ImageOverlay.WMS(url, options);
};