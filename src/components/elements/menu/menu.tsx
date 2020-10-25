import React, { useState } from 'react';
import { useDrop } from 'react-dnd'
import { ItemTypes } from '~/util/constants'
import DraggableApp from '../draggable_app/draggable_app'
import DroppableApp from '../droppable_app/droppable_app'

function Menu(props: any) {
  const { selectedApp, setSelectedApp, arrAppXY, setArrAppXY, filteredApps, setFilteredApps } = props;

  function moveDefaultApp(name: string, toX: any, toY: any, setStatePositions: any) { // Функция для изменения позиции приложений из меню
    let positions = filteredApps.map((app: any, index: any) => {

      if (selectedApp.x === app.x && selectedApp.y === app.y && toY === -1) {
        return { name: name, x: app.x, y: app.y }
      }
      else if (toX === app.x && toY === app.y) {
        setArrAppXY(
          arrAppXY.map((appDisplay: any) => {
            return appDisplay.map((defaultIcon: any) => {
              if (selectedApp.y === defaultIcon.y && selectedApp.x === defaultIcon.x) { return { name: app.name, x: defaultIcon.x, y: defaultIcon.y } }
              else { return defaultIcon }
            })
          })
        )
        return { name: selectedApp.name, x: toX, y: toY }
      }
      else {
        return app
      }
    })
    setFilteredApps(positions)
  }

  return (
    <div className='menu' >
      {
        filteredApps.map((el: any, index: any) => <DroppableApp el={el} index={el.index} displayNumber={el.y} arrAppXY={arrAppXY}
          setArrAppXY={setArrAppXY} moveKnight={moveDefaultApp} >
          {DraggableApp(el, index, selectedApp, setSelectedApp)}
        </DroppableApp>)
      }
    </div>
  );
}

export default Menu;

