import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './style/index.scss'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SwiperCore, { Pagination } from "swiper"
SwiperCore.use([Pagination])

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}  >
      <App />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
