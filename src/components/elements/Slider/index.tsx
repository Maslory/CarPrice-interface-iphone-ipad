import React, { useState, useEffect, useRef } from "react";
import Swiper from 'react-id-swiper';
import ArrayList from '../ArrayList'
import appConfig from '~/util/app_config.json'
import 'swiper/swiper.scss'
import { splitArr, setAppsInLocalStorage, getAppsInLocalStorage } from '~/util/common'
import './style.scss'
import 'swiper/components/pagination/pagination.scss'
import DraggableApp from '../draggable_app/draggable_app'
import DroppableApp from '../droppable_app/droppable_app'
import Menu from '../menu/menu'

const Slider = () => {
  const apps = Object.keys(appConfig.installed_apps);
  const filterMenu = getAppsInLocalStorage('menu_app').length === 0 ?
    [{ name: apps[0], x: 0, y: -1 }, { name: apps[1], x: 1, y: -1 },
    { name: apps[2], x: 2, y: -1 }, { name: apps[3], x: 3, y: -1 }, { name: apps[4], x: 4, y: -1 }] : getAppsInLocalStorage('menu_app')
  const [filteredApps, setFilteredApps] = useState(filterMenu)

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
          swiper.slideNext();
        }
        function handleScrollLeft(event: any) {
          swiper.slidePrev();
        }

        const slidePrevElement = document.getElementById('on-mouse-move_left-side_slide-next');
        const slideNextElement = document.getElementById('on-mouse-move_right-side_slide-next');
        //@ts-ignore
        slideNextElement.addEventListener('dragenter', handleScrollRight)
        //@ts-ignore
        slidePrevElement.addEventListener('dragenter', handleScrollLeft)

      }
    }
  }

  function setAppsOnDisplay() {

    const appsOnDisplay = getAppsInLocalStorage('appsOnDisplay')
    if (appsOnDisplay.length === 0) {
      let arr = filterAllApps(apps)
      return arr
    }
    else {
      let arr = filterAllApps(apps)
      return arr
    }

    function filterAllApps(arr: any) {
      let filterOptions = apps.filter((el) => {
        return apps.find((a) => { return a === el })
      })
      const filterMainApps = filterOptions.filter(el => {
        let bool = true
        filteredApps.forEach(item => el === item.name ? bool = false : '')
        return bool
      })
      const array_chunks = splitArr(filterMainApps, Math.ceil(filterMainApps.length / 20), 20)
      return array_chunks.map((el, displayNumber) => {
        return el.map((app: any, index: any) => {
          return { name: app, x: index, y: displayNumber }
        })
      })
    }
  }

  const [arrAppXY, setArrAppXY] = useState(setAppsOnDisplay())
  const [selectedApp, setSelectedApp] = useState({ name: '', x: 0, y: 0 })
  const [swiper, setSwiper] = useState(null);



  function moveApp(name: string, toX: any, toY: any, setStatePositions: any) { // Функция для изменения позиции приложения
    checkOldPosition()
    function checkOldPosition() {
      let positions = arrAppXY.map((array_apps: any, index: any) => {
        return array_apps.map((app: any) => {
          if (toX === app.x && toY === app.y) {
            setFilteredApps(filteredApps.map((defaultIcon: any) => selectedApp.y === defaultIcon.y && selectedApp.x === defaultIcon.x ? { name: name, x: defaultIcon.x, y: defaultIcon.y } : defaultIcon))
            console.log(toY, toX)
            return { name: selectedApp.name, x: toX, y: toY }
          }
          else if (selectedApp.x === app.x && selectedApp.y === app.y && toY !== -1) {
            return { name: name, x: app.x, y: app.y }
          }
          else if (selectedApp.y === -1 && toX === app.x && toY === app.y) {
            let defaultApp = filteredApps.filter((item) => item.x === toX && item.y === toY && selectedApp.name !== item.name);
            return { name: selectedApp.name, x: app.x, y: app.y }
          }
          else {
            return app
          }
        })
      })
      setArrAppXY(positions)
    }
  }

  useEffect(() => {
    setAppsInLocalStorage(filteredApps, 'menu_app')
  }, [filteredApps])

  useEffect(() => {
    let arr: any = [];
    arrAppXY.forEach(el => {
      arr = arr.concat(el)
    })
    setAppsInLocalStorage(arr, 'appsOnDisplay')
  }, [arrAppXY])

  return (
    <>
      <Swiper
        //@ts-ignore
        getSwiper={setSwiper}
        {...params}>
        {arrAppXY.map((el: any, index: Number) => {
          return <div className='items_block'  > <div className='items_block'  >
            <ArrayList array={el} displayNumber={index}  >
              {
                //@ts-ignore
                ({ el, displayNumber, index }) => {
                  return <DroppableApp el={el} index={index} displayNumber={displayNumber} arrAppXY={arrAppXY} setArrAppXY={setArrAppXY} moveKnight={moveApp} >
                    {DraggableApp(el, index, selectedApp, setSelectedApp)}
                  </DroppableApp>
                }
              }
            </ArrayList>
          </div> </div>
        })}
      </Swiper >
      <Menu selectedApp={selectedApp} setSelectedApp={setSelectedApp} arrAppXY={arrAppXY} setArrAppXY={setArrAppXY} filteredApps={filteredApps} setFilteredApps={setFilteredApps} />
    </>
  );
}

export default Slider
