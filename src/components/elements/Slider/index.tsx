import React, { useState, useEffect, useRef } from "react";
import Swiper from 'react-id-swiper';
import ArrayList from '../ArrayList'
import appConfig from '~/util/app_config.json'
import 'swiper/swiper.scss'
import { splitArr } from '~/util/common'
import './style.scss'
import 'swiper/components/pagination/pagination.scss'
import DraggableApp from '../draggable_app/draggable_app'
import DroppableApp from '../droppable_app/droppable_app'

const Slider = () => {
  const [renderSwiper, setRenderSwiper] = useState(false)
  const [swiperActive, setSwiperActive] = useState(true)
  const [eventActive, setEventActive] = useState(false)
  let params = {
    slidesPerView: 'auto',
    touchStartPreventDefault: false,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    on: {
      'init': (swiper: any, event: any) => {
        function handleScrollRight(event: any) {
          console.log(event)
          swiper.slideNext();
        }
        function handleScrollLeft(event: any) {
          swiper.slidePrev();
        }
        if(!eventActive){
          alert()
          setEventActive(true)
          const slidePrevElement = document.getElementById('on-mouse-move_left-side_slide-next');
          const slideNextElement = document.getElementById('on-mouse-move_right-side_slide-next');
          //@ts-ignore
          slideNextElement.addEventListener('dragenter', handleScrollRight)
          //@ts-ignore
          slidePrevElement.addEventListener('dragenter', handleScrollLeft)
        }
      }
    }
  }
  const apps = Object.keys(appConfig.installed_apps);
  const menu_apps = localStorage.getItem('menu_apps') || ''
  const filtered_apps = apps.filter((el) => {
    let arr = menu_apps.split('')
    let bool = false
    arr.forEach((item: any) => {
      if (el === item) {
        bool = true
      }
    });
    return bool
  });// TODO - в localStorage записывать иконки для нижнего меню и исключать их 
  const array_chunks = splitArr(apps, Math.ceil(apps.length / 20), 20)


  const [arrAppXY, setArrAppXY] = useState(array_chunks.map((el, displayNumber) => {
    return el.map((app: any, index: any) => {
      return { name: app, x: index, y: displayNumber }
    })
  }))
  const [selectedApp, setSelectedApp] = useState({ name: '', x: 0, y: 0 })
  const [swiper, setSwiper] = useState(null);
  const [translate, updateTranslate] = useState(0);
  const [transition, updateTransition] = useState(0);

  // const ref = useRef(null);

  // const goNext = () => {
  //       //@ts-ignore
  //       swiper.slideNext();
  // };

  // const goPrev = () => { 
  //   //@ts-ignore
  //     swiper.slidePrev();
  // };


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


  function moveKnight(name: string, toX: any, toY: any, setStatePositions: any) {
    checkOldPosition()
    function checkOldPosition() {
      let positions = arrAppXY.map((array_apps: any, index: any) => {
        return array_apps.map((app: any) => {
          if (toX === app.x && toY === app.y) {
            return { name: selectedApp.name, x: toX, y: toY }
          }
          else if (selectedApp.x === app.x && selectedApp.y === app.y) {
            return { name: name, x: app.x, y: app.y }
          }
          else {
            return app
          }
        })
      })
      setArrAppXY(positions)
    }
  }




  return (
    <>
      <Swiper
        // ref={() => alert()} 
        //@ts-ignore
        getSwiper={setSwiper}
        {...params}>
        {arrAppXY.map((el: any, index: Number) => {
          return <div className='items_block'  > <div className='items_block'  >
            <ArrayList array={el} displayNumber={index}  >
              {
                //@ts-ignore
                ({ el, displayNumber, index }) => {
                  return <DroppableApp el={el} index={index} displayNumber={displayNumber} arrAppXY={arrAppXY} setArrAppXY={setArrAppXY} moveKnight={moveKnight} >
                    {DraggableApp(el, index, selectedApp, setSelectedApp)}
                  </DroppableApp>
                }
              }
            </ArrayList>
          </div> </div>
        })}
      </Swiper >
    </>
  );
}

export default Slider
