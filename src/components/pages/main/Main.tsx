import React, { useEffect } from 'react';
import '../../elements/ArrayList'
import Slider from '../../elements/Slider/index'
import Time from '../../elements/time'

function Main() {

  return (
    <div className="main">
      <div className='device' >

      </div>
      <div className='display' >
        <div className='top_block' >
<Time/>
        </div>
        <div className='main_block' >
<Slider></Slider>
        </div>
        <div className='bottom_block' >

        </div>
        <div className='menu' >

        </div>
      </div>
    </div>
  );
}

export default Main;
