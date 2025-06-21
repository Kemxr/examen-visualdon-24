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


        // 2.2 Les 10 communes ayant le plus d'arbres par km2 ---


        // 2.3 Peut-on considérer les données sur les arbres extraites d'OpenStreetMap comme fiables ? Quelles autres entités pourraient fournir des données alternatives ou complémentaires ? ---


        /*
========================================================================================================================
3. Visualisations (70 points)
========================================================================================================================
        */

        // --- 3.1 Carte choroplète ---










        // --- 3.2 Carte à bulles ---
     












        // --- 3.3 Barchart ---











    });