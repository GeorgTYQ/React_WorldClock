import styled from "styled-components";

const StyledTime = styled.div`
  color: ${({light, theme})=>light ? theme.color.dark : theme.color.light};
  margin-bottom: ${props => props.margin_top};
`

const Time = (props)=> {
  const {...rest} = props;
  return (
    <StyledTime {...rest}>
      {props.children}
    </StyledTime>
  )
}

export default Time;