
import styled, { css } from 'styled-components';
import { color, font, mixin } from '../../shared/utils/styles';


interface ISprintSection {
    sprint_name: string;
}

export const SprintSection = styled.div<ISprintSection>`
    width: 100%;
    position: relative;
    display: block;
    margin: 0 0x;
    border-radius: 0px;
    ${props =>
    props.sprint_name !== "Backlog" &&
    css`
      background: ${color.backgroundLight};
    `}
`

export const SprintSectionIssueContainer = styled.div`
    width: 97%;
    display: block;
    min-height: 40px;
    position: relative;
    top: 10px;
    margin-top: 10px;
    //padding-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 10px;
    border: solid;
    border-color: #FFFFFF;
    background: ${color.backgroundLightest};
`

export const SprintSectionBacklog = styled.div`
    width: 100%;
    position: relative;
    display: block;
    margin: 0 0px;
    right: 1px;
    border-radius: 3px;
`

export const SprintSectionIssueContainerEmpty = styled.div`
    width: 97%;
    display: block;
    height: 40px;
    position: relative;
    top: 10px;
    margin-top: 10px;
    padding-top: 10px;
    margin-bottom: 10px;
    margin-left: 15px;
    margin-right: 10px;
    border: dashed;
    //border-color: #FFFFFF !important;
    //background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='5' stroke-dasharray='6%2c 11' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    background: ${color.backgroundLightest};
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 5px;
  min-height: 400px;
  width: 25%;
  border-radius: 3px;
  background: ${color.backgroundLightest};
`;