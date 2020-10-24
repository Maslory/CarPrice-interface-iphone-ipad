import React from 'react'
import {useDrag, DragPreviewImage} from 'react-dnd'
import {ItemTypes} from '~/util/constants'

 const DraggableApp = (el: any, index:any, selectedApp:any, setSelectedApp:any) => {
  const [{ isDragging }, drag, preview] = useDrag({
   item: { type: ItemTypes.APP },
   collect: (monitor) => ({
     isDragging: !!monitor.isDragging()
   })
 })
   
 
  return <> 
     {/* <DragPreviewImage connect={preview} src={require('~/style/img/icons/' + el.name + '.png')} /> */}
 
   <div
   onMouseEnter={() => {setSelectedApp(el)}}
   id={index} ref={drag}
   style={{
    opacity: isDragging ? 0.5 : 1,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  }}
   >
   <img src={require('~/style/img/icons/' + el.name + '.png')} alt="иконки" />
   {el.name}


  </div> </>
 }

 export default DraggableApp