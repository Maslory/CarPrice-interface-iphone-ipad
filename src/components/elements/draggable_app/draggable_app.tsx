import React from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from '~/util/constants'

const DraggableApp = (el: any, index: any, selectedApp: any, setSelectedApp: any) => {
  const arrDefaultApps = ['S143', 'S144', 'S145', 'S146', 'S147']
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.APP },
    //@ts-ignore
    canDrag: (monitor) => {
      let bool = true;
      arrDefaultApps.map((item: any) => {
        //@ts-ignore
        if (item === monitor.sourceId && el.name === 'empty') {
          bool = false
        }
      })
      return bool
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  })


  return <>
    <div
      onMouseEnter={() => { setSelectedApp(el) }}
      id={index} ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img src={require('~/style/img/icons/' + el.name + '.png')} alt="иконки" />
      <div>{el.name === 'empty' ? '' : el.name}</div>
    </div> </>
}

export default DraggableApp