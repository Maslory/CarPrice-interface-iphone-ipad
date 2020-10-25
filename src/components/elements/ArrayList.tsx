import React from 'react';


function ArrayList(props: any) {
  const { array, displayNumber } = props;

  return array.map((el: any, index: any) => {
    return props.children({
      el: el, index: index, displayNumber: displayNumber
    })
  })
}

export default ArrayList;