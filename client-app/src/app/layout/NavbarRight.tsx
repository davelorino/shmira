import React, { useEffect, useState } from 'react';
import { Issue }from '../models/issue';
import { List } from 'semantic-ui-react';
import styled from 'styled-components';
import {Menu, Segment, Image, Header} from 'semantic-ui-react';
import { css } from 'styled-components';
import Icon from './Icon';
import NormalizeStyles from './NormalizeStyles';
import BaseStyles from './BaseStyles';
import './fontStyles.css';
import { NavLink } from 'react-router-dom';

interface Props {
  openForm: () => void;
}


const NavbarRight = ({openForm}: Props ) => {
    const font = {
        regular: 'font-family: "CircularStdBook"; font-weight: normal;',
        medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
        bold: 'font-family: "CircularStdBold"; font-weight: normal;',
        black: 'font-family: "CircularStdBlack"; font-weight: normal;',
        size: (size: any) => `font-size: ${size}px;`,
      };
    
    const Bottom = styled.div`
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
    `;
    
    
    const color = {
      primary: '#0052cc', // Blue
      success: '#0B875B', // green
      danger: '#E13C3C', // red
      warning: '#F89C1C', // orange
      secondary: '#F4F5F7', // light grey
    
      textDarkest: '#172b4d',
      textDark: '#42526E',
      textMedium: '#5E6C84',
      textLight: '#8993a4',
      textLink: '#0052cc',
    
      backgroundDarkPrimary: '#0747A6',
      backgroundMedium: '#dfe1e6',
      backgroundLight: '#ebecf0',
      backgroundLightest: '#F4F5F7',
      backgroundLightPrimary: '#D2E5FE',
      backgroundLightSuccess: '#E4FCEF',
    
      borderLightest: '#dfe1e6',
      borderLight: '#C1C7D0',
      borderInputFocus: '#4c9aff',
    }
    
    const sizes = {
      appNavBarLeftWidth: 64,
      secondarySideBarWidth: 230,
      minViewportWidth: 1000,
    }
    
    const zIndexValues = {
      modal: 1000,
      dropdown: 101,
      navLeft: 100,
    }
    
    
    const mixin = {
    
      hardwareAccelerate: css`
        transform: translateZ(0);
      `,
      cover: css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      `,
        clickable: css`
        cursor: pointer;
        user-select: none;
      `
    }
    
    const NavLeft = styled.aside`
    z-index: ${zIndexValues.navLeft};
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    height: 100vh;
    width: ${sizes.appNavBarLeftWidth}px;
    background: ${color.backgroundDarkPrimary};
    transition: all 0.1s;
    ${mixin.hardwareAccelerate}
    &:hover {
      width: 200px;
      box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.6);
    }
    `
    const Item = styled.div`
      position: relative;
      width: 100%;
      height: 42px;
      line-height: 42px;
      padding-left: 64px;
      color: #deebff;
      transition: color 0.1s;
      ${mixin.clickable}
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      i {
        position: absolute;
        left: 18px;
      }
    `;
    
    const ItemText = styled.div`
      position: relative;
      right: 12px;
      visibility: hidden;
      opacity: 0;
      text-transform: uppercase;
      transition: all 0.1s;
      transition-property: right, visibility, opacity;
      ${font.bold}
      ${font.size(12)}
      ${NavLeft}:hover & {
        right: 0;
        visibility: visible;
        opacity: 1;
      }
    `;

  return(
    <NavLeft>
      <div style={{paddingTop: 12, paddingBottom:24}}>
      <Icon type="duck" size={30} top={10} left={16} />
      <ItemText></ItemText>
      </div>
    
    <Item >
      <Icon type="search" size={22} top={0} left={3} />
      <ItemText>Search issues</ItemText>
    </Item>
    <Item onClick={openForm} >
      <Icon type="plus" size={22} top={0} left={3} />
      <ItemText>Create Issue</ItemText>
    </Item>

    </NavLeft>
  )
}

export default NavbarRight;