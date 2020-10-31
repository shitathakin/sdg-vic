//var d3 = require("d3");

var vectorLayers = [
    {
        url: '/geodata/foodInsecurity.json',
        name: 'sdg2',
        analysisProperty: "perc_population_food_insecurity"
    },
    {
        url: '/geodata/childrenSchool2018.json',
        name: 'sdg4',
        analysisProperty: "chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num"
    },
    {
        url: '/geodata/childrenSchool2013.json',
        name: 'sdg4-13',
        analysisProperty: "chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num"
    },
    {
        url: '/geodata/childrenSchool2015.json',
        name: 'sdg4-15',
        analysisProperty: "chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num"
    },
    {
        url: '/geodata/homicide2019.json',
        name: 'sdg16',
        analysisProperty: "a10_homicide_and_related_offences"
    },
    {
        url: '/geodata/homicide2015.json',
        name: 'sdg16-15',
        year: '2015',
        analysisProperty: "a10_homicide_and_related_offences"
    },
    {
        url: '/geodata/homicide2013.json',
        name: 'sdg16-13',
        year: '2013',
        analysisProperty: "a10_homicide_and_related_offences"
    },
    {
        url: '/geodata/women_in_parliament.json',
        name: 'sdg5',
        analysisProperty: "%_of_women_councillors_in_local_parliament"
    },
    {
        url: '/geodata/medianHouseholdIncome.json',
        name: 'sdg1',
        analysisProperty: "med_hhd_inc_wk_tot"
    }
]
var baseMaps = [
    new ol.layer.Tile({
        source: new ol.source.OSM({
          url: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    
        }),
        visible: false,
        title: 'OSM'
      }),
      
      
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{scale}.png"
        }),
        visible: false,
        title: 'CartoDB'
      }),
      new ol.layer.Tile({
        source: new ol.source.XYZ({
          url: "//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        }),
        visible: false,
        title: 'arcgis'
      }),
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        }),
        visible: false,
        title: 'OSMHumanitarian'
      })
    ]
    
   
/**
 * init openlayers
 */

var map = new ol.Map({
    controls: ol.control.defaults({
        attribution: false,
        zoom: false,
        rotate: false
    }),
    target: 'map-container',
    layers: [
        new ol.source.Tile({
            source: new ol.source.XYZ({
                url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
            }),
            visible: true,
        }),

    ],
    view: new ol.View({
        center: [15618836.6863,-4368529.0406],
        zoom: 6,
        extent: [15091726.9393,-5223808.4042,18181005.8744,-3810029.1290]
    })
});

/**
 * 
 * handle base layers 
 */
// for (var bl of baseMaps) {
//     console.log(bl.values_.title);
//     map.addLayer(bl)
// var option = document.createElement("option");
//   option.setAttribute("value", bl.values_.title);
//   option.setAttribute("title", bl.values_.title);
//   option.innerHTML = bl.values_.title;
//   document.getElementById('baseLayerList').appendChild(option);
// }

/**
 * 
 *Vector layer section  
 */
//create color scale with d3 and use dynamic feature property outlined in config to create chloropleth.
function generateStyleFunction(vl) {
    var color_scale;
    d3.json(vl.url).then(function (data) {
        var dataSet = data['features'];

        var all_areas = dataSet.map(function (d) { return d['properties'][vl.analysisProperty]; });
        color_scale = d3.scaleQuantile().domain(all_areas).range(['rgba(244,239,67,0.9)', 'rgba(243,205,69,0.9)', 'rgba(243,171,71,0.9)', 'rgba(242,137,73,0.9)', 'rgba(242, 69, 78,0.9)']);
    });

    return (function styleFunction(feature) {
        let fill = new ol.style.Fill({ color: color_scale(feature.get(vl.analysisProperty)) });
        return new ol.style.Style({
            fill: fill,
            stroke: new ol.style.Stroke({
                color: 'black', width: 1
            }),

        })
    })
}

var vecLayers = [];
// for (let vl of vectorLayers) {

//     let newVecLayer = new ol.layer.Vector({
//         visible: false,
//         title: vl.name,
//         year: vl.year,
//         source: new ol.source.Vector({
//             format: new ol.format.GeoJSON(),
//             url: vl.url
//         }),
//         style: generateStyleFunction(vl)
//     })
//     map.addLayer(newVecLayer);
//     vecLayers.push(newVecLayer);

// }

layerSwitcher(vecLayers, vectorLayers);
yearLayerSwitcher(vecLayers, vectorLayers);
baseLayerSwitcher(baseMaps);

//visibility switcher for vector layers 
function layerSwitcher(ary, ary2) {

    document.querySelector('#mySelect').addEventListener('change', (event) => {
        console.log(event.target.value);
        ary.forEach(function (element, index, array) {

            let baseLayerName = element.get('title');
            element.setVisible(baseLayerName === event.target.value);




        })
        ary2.forEach(function (mem) {
            if (mem.name === event.target.value) {

                displayResults(mem);
            }

        })

    })
}
//year select
function yearLayerSwitcher(ary, ary2) {

    document.querySelector('#year').addEventListener('change', (event) => {
        console.log(event.target.value);
        ary.forEach(function (element, index, array) {

            let baseLayerName = element.get('title');
            element.setVisible(baseLayerName === event.target.value);




        })
        ary2.forEach(function (mem) {
            if (mem.name === event.target.value) {

                displayResults(mem);
            }

        })

    })
}


/**
 * pop up section 
 */

//vector feature popup info
const overlayContainerElement = document.querySelector('.overlay-container')
const overlayLayer = new ol.Overlay({
    element: overlayContainerElement
})
map.addOverlay(overlayLayer);
const overlayFeatureName = document.getElementById('feature-name');
const overlayFeatureAdditioninfo = document.getElementById('feature-additional-info');
const overlayFeatureCode = document.getElementById('feature-code');

//vector feature pop up 
map.on('click', function (e) {
    overlayLayer.setPosition(undefined);
    map.forEachFeatureAtPixel(e.pixel, function (feature, layer) {
        let clickedCoordinate = e.coordinate;
        let clickedFeatureName = feature.get('feature_name');
        let clickedFeatureCode = feature.get('feature_code');
        let clickedFeatureInfo;
        overlayLayer.setPosition(clickedCoordinate);
        overlayFeatureName.innerHTML = clickedFeatureName;
        overlayFeatureCode.innerHTML = clickedFeatureCode;
        overlayFeatureAdditioninfo.innerHTML = additInfoSection(feature, clickedFeatureInfo);
    })
})

//dynamic pop up info 
function additInfoSection(feature, clickedFeatureInfo) {

    if (feature.get('perc_population_food_insecurity')) {
        console.log('true');
        document.getElementById('lbl').textContent = '%_pop:'
        clickedFeatureInfo = feature.get('perc_population_food_insecurity');
        console.log(clickedFeatureInfo);
        var num = clickedFeatureInfo.toFixed(4);
        return num;

    }
    if (feature.get('chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num')) {
        document.getElementById('lbl').textContent = 'chld_enrolled:'
        clickedFeatureInfo = feature.get('chld_enrld_prescl_prog_5_yr_olds_enrld_prescl_prescl_prog_num');
        return clickedFeatureInfo;

    }
    if (feature.get('a10_homicide_and_related_offences')) {
        document.getElementById('lbl').textContent = 'homicides_rec:'
        clickedFeatureInfo = feature.get('a10_homicide_and_related_offences');
        return clickedFeatureInfo;

    }
    if (feature.get('med_hhd_inc_wk_tot')) {
        document.getElementById('lbl').textContent = 'med_wk_income:'
        clickedFeatureInfo = feature.get('med_hhd_inc_wk_tot');
        return '$'+clickedFeatureInfo;

    }
    if (feature.get('%_of_women_councillors_in_local_parliament')) {
        document.getElementById('lbl').textContent = '%_wmn_prlimnt:'
        clickedFeatureInfo = feature.get('%_of_women_councillors_in_local_parliament');
        return clickedFeatureInfo;

    }

}

/**
 * click/hover section
 */

//click style
var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(43, 138, 79,0.6)',
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 3,
    }),
});

//hover style
var highlightStyle2 = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(43, 138, 79,0.9)',
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 3,
    }),
});

var selected = null;
var status = document.getElementById('status');

map.on('pointermove', function (e) {
    if (selected !== null) {
        selected.setStyle(undefined);
        selected = null;
    }

    map.forEachFeatureAtPixel(e.pixel, function (f) {
        selected = f;

        f.setStyle(highlightStyle);
        return true;
    });

});

var select = new ol.interaction.Select({
    condition: ol.events.condition.singleClick,
    style: highlightStyle2
});
var clickSelected = null;
if (select !== null) {
    map.addInteraction(select);
    map.on('select', function (e) {

        document.getElementById('status').innerHTML =
            '&nbsp;' +
            e.target.getFeatures().getLength() +
            ' selected features (last operation selected ' +
            e.selected.length +
            ' and deselected ' +
            e.deselected.length +
            ' features)';


    });


}

/**
 * results section 
 */
function displayResults(vl) {
    if (document.getElementById('results-list') != null) {
        var x = document.getElementById('results-list');
        document.querySelector('#results-section').removeChild(x);
        document.getElementById('modal-body').innerHTML = '';
        
        jsonDataHandler(vl);
        createHistogram(vl);
    }
    else { jsonDataHandler(vl); createHistogram(vl) }
    
}


/**
 * more d3 
 */

function createHistogram(vl) {

    
    document.getElementById('exampleModalLabel').textContent = vl.analysisProperty;

    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    },
        width = 550 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    var y = d3.scaleLinear()
        .range([height, 0]);

    var svg = d3.select("svg")

        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 550 550")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")


    svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("class", "backbar");


    d3.json(vl.url).then(function (data, error) {

        var data = data['features'];

        data.forEach(function (d) {

            d['properties'][vl.analysisProperty] = +d['properties'][vl.analysisProperty];
        });


        x.domain(data.map(function (d) {

            return d['properties']['feature_name'];
        }));
        y.domain([0, d3.max(data, function (d) {
            return d['properties'][vl.analysisProperty];
        })]);


        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d['properties']['feature_name']);
            })
            .attr("width", x.bandwidth())
            .attr("y", function (d) {

                return y(d['properties'][vl.analysisProperty]);
            })
            .attr("height", function (d) {
                return height - y(d['properties'][vl.analysisProperty]);
            })

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .style("font", "5px times")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .style("text-anchor", "end")
            .style("fill", "#000")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-50)");




        svg.append("g")
            .call(d3.axisLeft(y));


        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + (-margin.left / 2) + "," + (height / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate




    })
    
}

function jsonDataHandler(vl) {
    
    d3.json(vl.url).then(function (data) {

        var dataSet = data['features'];

        //console.log(d3.keys(data.features[0].properties));


        dataSet.sort(function (x, y) {
            return d3.descending(x['properties'][vl.analysisProperty], y['properties'][vl.analysisProperty]);

        })
        // dataSet.map(function (d) { return d['properties'][vl.analysisProperty]; });


        var resultsList = document.createElement('ul');
        resultsList.id = 'results-list';
        for (let i = 0; i < dataSet.length; i++) {

            var listItem = document.createElement('li');
            listItem.textContent = dataSet[i]['properties']['feature_name'] + ' : ' + dataSet[i]['properties'][vl.analysisProperty].toFixed(4);
            resultsList.appendChild(listItem);
            document.querySelector('#results-section').textContent = vl.analysisProperty;
            document.querySelector('#results-section').appendChild(resultsList);
        }




    })
}

function baseLayerSwitcher(ary) {

    var selectElement = document.querySelector('#baseLayerList');
    selectElement.addEventListener('change', (event) => {
      console.log(event.target.value);
      ary.forEach(function (element, index, array) {
        let baseLayerName = element.get('title');
        element.setVisible(baseLayerName === event.target.value);
      })
    })
  }