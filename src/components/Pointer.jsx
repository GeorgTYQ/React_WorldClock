import styled from "styled-components";
import Center from "./Center";
const PointerStyled = styled.div`
  position : relative;
  width: ${props => props.size};
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem;
  background:${props =>props.light ? `${props.white} ${props.bg_white}`: `${props.black} ${props.bg_black}`};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  border: 14px solid ${props => props.light ? props.black : props.white};
  box-shadow: ${props =>props.light ? props.bg_white_box_shadow : props.bg_black_box_shadow};
  color: ${props => props.light ? props.black : props.light};
`
const Pointer = (props) =>{
  const {...rest} = props;

  const config = {
    light: true,
    size: "250px",
    white: "#fff",
    black: "#222",
    bg_white: "url(clockimage/clock_white.png)",
    bg_black: "url(clockimage/clock_black.png)",
    bg_white_box_shadow: "inset 0 0 30px rgba(0, 0, 0, 0.1), 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 0 4px rgba(255, 255, 255, 1)",
    bg_black_box_shadow:
      "inset 0 0 30px rgba(237, 237, 237, 0.1), 0 20px 20px rgba(0, 0, 0, 0.5), 0 0 0 4px #091921",
  }
  return (
    <>
    <PointerStyled {...config} {...rest}/>


    </>
  )
}

export default Pointer;