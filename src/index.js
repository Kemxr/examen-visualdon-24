import * as d3 from "d3";


// Au cas où vous avez besoin de Leaflet pour les cartes
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Si vous avez besoin de styles CSS spécifiques
import "./style.css";


/*
========================================================================================================================
1. Dessin SVG (15 points)
========================================================================================================================
Vous pouvez dessiner la figure soit à partir d'ici ou directement dans l'HTML (index.html).
*/







// Données
const dataArbres = "../data/arbres_communes.geojson";
const dataCentres = "../data/centres_communes.geojson";

Promise.all([
    d3.json(dataArbres),
    d3.json(dataCentres)
]).then(([arbresCommunes, centresCommunes]) => {
     
     console.log('Contours géographiques (path) avec n_trees', arbresCommunes)
     console.log('Centres géométriques (circle)', centresCommunes)

        /*
========================================================================================================================
2. Manipulation des données (15 points)
========================================================================================================================
        */

        // 2.1 La commune ayant le plus d'arbres par km2---

        const communes = arbresCommunes.features.map(d => ({
            id: d.properties.id,
            name: d.properties.name,
            n_trees: d.properties.n_trees,
            area_km2: d.properties.area_km2,
            density: d.properties.n_trees / d.properties.area_km2
        }));

        const maxCommune = communes.reduce((acc, cur) => cur.density > acc.density ? cur : acc);
        console.log('Commune avec le plus grand nombre d\'arbres par km\u00b2:', `${maxCommune.name} (${maxCommune.density.toFixed(2)} arbres/km\u00b2)`);

        // 2.2 Les 10 communes ayant le plus d'arbres par km2 ---
        const top10 = [...communes].sort((a, b) => b.density - a.density).slice(0, 10);
        console.log('Top 10 des communes avec le plus grand nombre d\'arbres par km\u00b2:');
        top10.forEach((c, i) => {
            console.log(`${i + 1}. ${c.name} - ${c.density.toFixed(2)} arbres/km\u00b2`);
        });

        // 2.3 Peut-on considérer les données sur les arbres extraites d'OpenStreetMap comme fiables ? Quelles autres entités pourraient fournir des données alternatives ou complémentaires ? ---
        console.log('Les donn\u00e9es provenant d\'OpenStreetMap d\u00e9pendent des contributions b\u00e9n\u00e9voles et peuvent donc \u00eatre incompl\u00e8tes ou h\u00e9t\u00e9rog\u00e8nes.');
        console.log('Des collectivit\u00e9s publiques (communes, canton) ou des services de gestion des espaces verts pourraient fournir des donn\u00e9es plus contr\u00f4l\u00e9es et compl\u00e9mentaires.');


        /*
========================================================================================================================
3. Visualisations (70 points)
========================================================================================================================
        */

        // --- 3.1 Carte choroplète ---

        const densities = arbresCommunes.features.map(d => d.properties.n_trees / d.properties.area_km2);
        const color = d3.scaleQuantile()
            .domain(densities)
            .range(d3.schemeGreens[5]);

        const map = L.map('map').setView([46.6, 6.6], 9);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        function style(feature) {
            const density = feature.properties.n_trees / feature.properties.area_km2;
            return {
                fillColor: color(density),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.7
            };
        }

        function highlightFeature(e) {
            e.target.setStyle({ weight: 3 });
        }

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
        }

        function onEachFeature(feature, layer) {
            const density = (feature.properties.n_trees / feature.properties.area_km2).toFixed(1);
            layer.bindTooltip(`${feature.properties.name} - ${density} arbres/km²`);
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight
            });
        }

        const geojson = L.geoJson(arbresCommunes, {
            style,
            onEachFeature
        }).addTo(map);

        // Légende
        const legend = L.control({ position: 'bottomright' });
        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'legend');
            const quantiles = color.quantiles();
            const grades = [d3.min(densities), ...quantiles];
            for (let i = 0; i < grades.length; i++) {
                const from = grades[i];
                const to = grades[i + 1];
                div.innerHTML +=
                    `<i style="background:${color(from + 1e-6)}"></i> ` +
                    from.toFixed(0) + (to ? `&ndash;${to.toFixed(0)}<br>` : '+');
            }
            return div;
        };
        legend.addTo(map);





        // --- 3.2 Carte à bulles ---
     












        // --- 3.3 Barchart ---











    });