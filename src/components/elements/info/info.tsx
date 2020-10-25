import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '~/util/constants'
import './style.scss'

const Info = (props: any) => {
  return <div className='info'  >
<div className='info__header' >Руководство по использованию:</div>
<div className='info__main-block'  >
<div>Иконки можно перемещать, для этого нужно по вертикали поднять или опустить иконку.</div>
<div>Также её можно переместить на другой экран, подведя к границам экрана.</div>
<div>Все иконки сохраняются в localStorage и в папке "util" хранится app_config.json, в котором находится список используемых приложений на устройстве</div>
<div>Переключение между экранами происходит с помощью кнопок, либо свайпами по экрану.</div>
</div>
  </div>
}

export default Info