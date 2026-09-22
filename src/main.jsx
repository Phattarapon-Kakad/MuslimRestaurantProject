import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './styles/legacy/route.css';
import './styles/legacy/map-polish.css';
import './styles/legacy/ui-finish.css';
import './styles/legacy/layout-cleanup.css';
import './styles/legacy/styles.css';
import './styles/legacy/visual.css';
import './styles/variables.css';
import './styles/global.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);