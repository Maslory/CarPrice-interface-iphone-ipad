import React, { useEffect, useState } from 'react';

function Time() {
 const [time, setTime] = useState('hh:mm')
  useEffect(() => {
   setTimeout(()=> {
    const date = new Date()
    let hours = String(date.getHours())
    let minutes =  String(date.getMinutes())
    let date_time = time.replace('hh', hours).replace('mm', minutes.split('').length === 1 ? '0' + minutes : minutes)
    setTime(date_time)
   }, 100)
  },[])
  return (
    <div>
      {time}
    </div>
  );
}

export default Time;
