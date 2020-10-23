import React, { useState, useEffect } from "react";
import Swiper from 'react-id-swiper';
import ArrayList from '../ArrayList'
import appConfig from '~/util/app_config.json'
import 'swiper/swiper.scss'
import { splitArr } from '~/util/common'
import './style.scss'
import 'swiper/components/pagination/pagination.scss'


const Slider = () => {
 const [swiperActive, setSwiperActive] = useState(true)
 const [style1, setStyle] = useState('')
 let params = {
  slidesPerView: 'auto',
  loop: false,
        pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
 };
 const apps = Object.keys(appConfig.installed_apps);
 const array_chunks = splitArr(apps, Math.ceil(apps.length / 20), 20)
 const [swiper, updateSwiper] = useState(null);
 const [translate, updateTranslate] = useState(0);
 const [transition, updateTransition] = useState(0);

 useEffect(() => {
   if (swiper) {
     // @ts-ignore
     swiper.on('setTranslate', (t) => {
       updateTranslate(t);
     });
     // @ts-ignore
     swiper.on('setTransition', (t) => {
       updateTransition(t);
     });
   }
 }, [swiper])



 const renderApp = (name: string) => {
  return <div className='item_app' >
   <img src={require('~/style/img/icons/' + name + '.png')} alt="иконки" />
   {name}
  </div>
 }

function handleSwiper(){
 //@ts-ignore
document.getElementsByClassName('swiper-container')[0].classList.add('disabled')
document.getElementsByClassName('swiper-container')[0].classList.remove('disabled')
}

 return (
  <>
  <button
  onClick={() => handleSwiper()}
  ></button>
   <Swiper 
    // @ts-ignore
    getSwiper={updateSwiper}  {...params}>
{array_chunks.map((el:any) => {
 return   <div className='items_block' >
 <div className='items_block'   ><ArrayList array={el}  >
    {
     //@ts-ignore
     ({ el }) => {
      return renderApp(el)
     }
    }
   </ArrayList> </div> 
 </div>
})}
   </Swiper >

  </>
 );
}

export default Slider
