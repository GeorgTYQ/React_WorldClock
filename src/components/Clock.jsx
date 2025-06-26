import React from 'react'
import styled from 'styled-components'

import City from "./City";
import Time from "./Time";
import Pointer from "./Pointer";
import Center from "./Center";
import Core from "./Core";
import useClockStore from '../store/clockStore';



const StyledClock = styled.div`
  width: ${props => props.size};
  aspect-ratio: 1/1;
  background-color: ${({ light, theme }) => light ? theme.colorBackground.light : theme.colorBackground.dark};
  color: ${({ light, theme }) => light ? theme.color.light : theme.color.dark};

  border-radius: 2rem;
  padding: 2rem;
  margin: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }
`

const Clock = (props) => {
  const { city, timezone } = props;
  const size = '40rem'

  const updateClock = useClockStore(state => state.updateClock)
  const setClockLight = useClockStore(state => state.setClockLight)
  const clockData = useClockStore(state => state.clocks[city] || {})

  const calculateTime = () => {
    const currentTime = new Date()
    const offset = timezone * 60 * 60 * 1000
    const timeWithOffset = new Date(currentTime.getTime() + offset)

    const unitDeg = 360 / 60
    const bigUnitDeg = 360 / 12

    const hour = timeWithOffset.getUTCHours()
    const minute = timeWithOffset.getUTCMinutes()
    const second = timeWithOffset.getUTCSeconds()

    const newTimeDate = {
      dateTime: timeWithOffset,
      year: timeWithOffset.getUTCFullYear(),
      month: timeWithOffset.getUTCMonth() + 1,
      day: timeWithOffset.getUTCDate(),
      hour,
      minute,
      second,
      secoundDeg: second * unitDeg,
      minuteDeg: minute * unitDeg + second * unitDeg / 60,
      hourDeg: hour * bigUnitDeg + minute * unitDeg / 12,
      light: hour > 6 && hour < 18
    }

    updateClock(city, newTimeDate)
    setClockLight(city, newTimeDate.light)
  }

  React.useEffect(() => {
    calculateTime()
    const inerval = setInterval(calculateTime, 200)
    return () => clearInterval(inerval)
  }, [timezone, city])

  const {
    year,
    month,
    day,
    hour,
    minute,
    second,
    hourDeg,
    minuteDeg,
    secondDeg,
    light
  } = clockData


  return <StyledClock light={light} size={size}>
    <City light={light}>{city}</City>
    <Pointer light={light}>
      <Center light={light}></Center>
      <Core
        light={light}
        angle={hourDeg}
        pointer_width={7}
        pointer_light="#848484"
        pointer_dark="#ff6767"
      ></Core>
      <Core
        light={light}
        angle={minuteDeg}
        block_size={120}
        pointer_light="#848484"
        pointer_dark="#fff"
      ></Core>
      <Core
        light={light}
        angle={secondDeg}
        pointer_width={2}
        block_size={150}
        tail={25}
      ></Core>
    </Pointer>
    <Time light={light}>{year}-{month}-{day} {hour}:{minute}:{second}</Time>
  </StyledClock>

}

export default Clock