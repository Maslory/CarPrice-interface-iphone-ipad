import React, { useEffect } from 'react';
import '../../elements/ArrayList'
import Slider from '../../elements/Slider/index'
import Time from '../../elements/time'
import wifi_png from '~/style/img/apple&ipad/wifi.png'
import signal_png from '~/style/img/apple&ipad/signal.png'
import battery from '~/style/img/apple&ipad/battery.png'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '~/util/constants'

function Main() {

  return (
    <div className="main">
      <div className='device' >
      </div>
      <div className='display' >
        <div className='top_block' >
          <div style={{ display: 'inline-block' }}>
            <img style={{ width: 10 }} src={signal_png} alt="Уровень сигнала сети" /> 3G
            <img style={{ width: 10, marginLeft: 5 }} src={wifi_png} alt="Уровень сигнала wifi" />
          </div>
          <Time />
          <div style={{ display: 'inline-block' }} >
            85% <img style={{ width: 15 }} src={battery} alt="уровень заряда" />
          </div>
        </div>
        <div className='main_block' >
          <div
            id={'on-mouse-move_left-side_slide-next'}
          ></div>

          <div
            id={'on-mouse-move_right-side_slide-next'}
          ></div>
          <Slider></Slider>

        </div>
      </div>
    </div>
  );
}

export default Main;
