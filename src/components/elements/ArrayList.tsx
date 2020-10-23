import React from 'react';


function ArrayList(props:any) {
  const {array} = props;

  return array.map((el:any) => {
      return     props.children({
        el: el
       })
     })
}

export default ArrayList;