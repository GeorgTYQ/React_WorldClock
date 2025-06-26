import styled from "styled-components";
import City from "./City";
import Time from "./Time";
import { useState } from "react";
import React from "react";

const StyledClock = styled.div`
  width: ${props => props.size };
  aspect-ratio: 1/1;
  background-color: ${({light, theme}) => light ? theme.background.light : theme.background.dark};
  border-radius: 2rem;
  padding: 1rem;
  margin: 1rem;
  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease-in-out;
  &:hover{
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`
const Clock = (props) =>{
  const {city, timezone} = props;
  
  const [light, setLight] = useState(false);
  const [timeData, setTimeData] = useState(
    {
      dateTime: new Date(),
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      secondDeg: 0,
      minuteDeg: 0,
      hourDeg: 0,
    }
  )
  const calculateTime = () =>{
  const currentTime = new Date();
  const utcOffset = timezone * 60 * 60 * 1000; // Convert timezone to milliseconds
  const timeWithOffset = new Date(currentTime.getTime() + utcOffset);

  const year = timeWithOffset.getUTCFullYear();
  const month = timeWithOffset.getUTCMonth() + 1; // Months are zero
  const hour = timeWithOffset.getUTCHours()
  const date = timeWithOffset.getUTCDate();
  const minute = timeWithOffset.getUTCMinutes();
  const second = timeWithOffset.getUTCSeconds();
  const secondDeg = 360 / 60;
  const hourDeg = 360 / 12;
  
  setTimeData({
    dateTime: timeWithOffset,
    year: year,
    month: month,
    day: date,
    hour,
    minute,
    second,
    secondDeg: second * secondDeg,
    minuteDeg: minute * secondDeg + second * secondDeg / 60,
    hourDeg: hour * hourDeg + minute * hourDeg / 12,

  });
  }
  React.useEffect(() => {
  calculateTime();
  const handle = setInterval(() => {
    calculateTime();
  }, 200)
  return () =>{
    clearInterval(handle);
  };   
},[timezone,city])

  React.useEffect(() => {
    setLight(timeData.hour >= 6 && timeData.hour < 18);
  }, [timeData.hour])//等小时变化的时候就会变）;

  
  const size = "40rem"
  return(
    
    <StyledClock light={light} size={size}>
      <City light={light}>{city}</City>
      <Time light = {light}>{timeData.year} - {timeData.month} - {timeData.day} - {timeData.hour.toString().padStart(2, '0')} : {timeData.minute.toString().padStart(2, '0')} : {timeData.second.toString().padStart(2, '0')}
        
      </Time>
    </StyledClock>
  )
}

export default Clock;