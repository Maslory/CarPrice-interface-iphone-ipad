

import React,{ useEffect} from 'react'
import {useDrop} from 'react-dnd'
import {ItemTypes} from '~/util/constants'

 const DroppableApp = (props:any) => {
  const {displayNumber, index, arrAppXY, setArrAppXY, el, moveKnight} = props;

  const [{ isOver }, drop] = useDrop({
   accept: ItemTypes.APP,
   drop: () => moveKnight(el.name, el.x, el.y, setArrAppXY),
   collect: (monitor) => ({
     isOver: !!monitor.isOver()
   })
 })
   
  return  <div ref={drop}  className='item_app' > 
{props.children}
      </div>
 }

 export default DroppableApp
