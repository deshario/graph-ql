import styled from "styled-components";
import { FlexBoxInterface as FBoxInterface } from "../interface"

export const Flexbox = styled.div<FBoxInterface>`
  display: ${props => props.display || "flex"};
  flex-direction: ${props => props.direction || "row"};
  justify-content: ${props => props.justifyContent};
  margin-top: ${props => props.marginTop};
  margin-left: ${props => props.marginLeft};
  margin-right: ${props => props.marginRight};
  align-items: ${props => props.algItems};
  background: ${props => props.bg};
  padding: ${props => props.padding};

  @media (max-width: 920px) {
    display: ${props => props.hideonMobile};
  }
`