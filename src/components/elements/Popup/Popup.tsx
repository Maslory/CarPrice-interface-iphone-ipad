import React, { useEffect, FunctionComponent, useState } from 'react';
import './style.sass'


function PopupGallery(props: any) {
  const { array, element, visible, setVisible, selectPicture, albumName } = props;
  const [numberPictureInArray, setNumberPictureInArray] = useState(0)
  const max_number = array.length - 1

  useEffect(() => {
    if (visible === true) {
      const number = array.findIndex((el: any) => {
        if (el.thumbnailUrl === selectPicture) return true
        else return false
      })
      setNumberPictureInArray(number)
    }
  }, [visible])

  function handleClickOut(event: Event) {
    //@ts-ignore
    if (event.target.className === 'grey_background' || event.target.className === 'popup__content') {
      //@ts-ignore
      setVisible(false)
    };
  }

  function handleClickLeftArrow(event: Event) {
    if (numberPictureInArray === 0) {
      setNumberPictureInArray(max_number)
    } else {
      setNumberPictureInArray(numberPictureInArray - 1)
    }
  }

  function handleClickRightArrow(event: Event) {
    if (numberPictureInArray === max_number) {
      setNumberPictureInArray(0)
    } else {
      setNumberPictureInArray(numberPictureInArray + 1)
    }
  }

  return (
    <>
      {
        visible ?
          <div className='grey_background' onClick={(event: any) => { handleClickOut(event) }} >
            <div className='popup' >
              <div className='popup__content__footer' >
                Фотографии из альбома "{albumName}"
              </div>
              <div
                className='popup__content'
              >
                <div
                  className='popup__content__arrow' onClick={(event: any) => handleClickLeftArrow(event)}
                >
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 24l-18-12 18-12v24zm-16.197-12l15.197 10.132v-20.263l-15.197 10.131" /></svg>
                </div>
                <img className='popup__content__img' src={array[numberPictureInArray].thumbnailUrl} alt="картинки из галереи" />
                <div
                  className='popup__content__arrow'
                  onClick={(event: any) => handleClickRightArrow(event)}
                >
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M3 24l18-12-18-12v24zm16.197-12l-15.197 10.132v-20.263l15.197 10.131" /></svg>
                </div>
              </div>
              <div className='popup__content__footer no_copy' >
                {numberPictureInArray + 1} из {array.length}
              </div>
            </div>
          </div>
          : ''
      }
    </>
  );
}

export default PopupGallery