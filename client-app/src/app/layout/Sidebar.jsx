import styled from 'styled-components';
import { NavLink, useMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

//import { font, sizes, color, mixin, zIndexValues } from 'shared/utils/styles';
import { Logo } from './Logo';



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
  };
  

  const sizes = {
    appNavBarLeftWidth: 64,
    secondarySideBarWidth: 230,
    minViewportWidth: 1000,
  };
  
  const zIndexValues = {
    modal: 1000,
    dropdown: 101,
    navLeft: 100,
  };
  
  const font = {
    regular: 'font-family: "CircularStdBook"; font-weight: normal;',
    medium: 'font-family: "CircularStdMedium"; font-weight: normal;',
    bold: 'font-family: "CircularStdBold"; font-weight: normal;',
    black: 'font-family: "CircularStdBlack"; font-weight: normal;',
    size: size => `font-size: ${size}px;`,
  };
  
  const mixin = {
    darken: (colorValue, amount) =>
      Color(colorValue)
        .darken(amount)
        .string(),
    lighten: (colorValue, amount) =>
      Color(colorValue)
        .lighten(amount)
        .string(),
    rgba: (colorValue, opacity) =>
      Color(colorValue)
        .alpha(opacity)
        .string(),
    boxShadowMedium: css`
      box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    `,
    boxShadowDropdown: css`
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.31) 0px 0px 1px;
    `,
    truncateText: css`
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,
    clickable: css`
      cursor: pointer;
      user-select: none;
    `,
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
    placeholderColor: colorValue => css`
      ::-webkit-input-placeholder {
        color: ${colorValue} !important;
        opacity: 1 !important;
      }
      :-moz-placeholder {
        color: ${colorValue} !important;
        opacity: 1 !important;
      }
      ::-moz-placeholder {
        color: ${colorValue} !important;
        opacity: 1 !important;
      }
      :-ms-input-placeholder {
        color: ${colorValue} !important;
        opacity: 1 !important;
      }
    `,
    scrollableY: css`
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    `,
    customScrollbar: ({ width = 8, background = color.backgroundMedium } = {}) => css`
      &::-webkit-scrollbar {
        width: ${width}px;
      }
      &::-webkit-scrollbar-track {
        background: none;
      }
      &::-webkit-scrollbar-thumb {
        border-radius: 99px;
        background: ${background};
      }
    `,
    backgroundImage: imageURL => css`
      background-image: url("${imageURL}");
      background-position: 50% 50%;
      background-repeat: no-repeat;
      background-size: cover;
      background-color: ${color.backgroundLight};
    `,
    link: (colorValue = color.textLink) => css`
      cursor: pointer;
      color: ${colorValue};
      ${font.medium}
      &:hover, &:visited, &:active {
        color: ${colorValue};
      }
      &:hover {
        text-decoration: underline;
      }
    `,
    tag: (background = color.backgroundMedium, colorValue = color.textDarkest) => css`
      display: inline-flex;
      align-items: center;
      height: 24px;
      padding: 0 8px;
      border-radius: 4px;
      cursor: pointer;
      user-select: none;
      color: ${colorValue};
      background: ${background};
      ${font.bold}
      ${font.size(12)}
      i {
        margin-left: 4px;
      }
    `,
  };
  
  const Sidebar = styled.div`
  position: fixed;
  z-index: ${zIndexValues.navLeft - 1};
  top: 0;
  left: ${sizes.appNavBarLeftWidth}px;
  height: 100vh;
  width: ${sizes.secondarySideBarWidth}px;
  padding: 0 16px 24px;
  background: ${color.backgroundLightest};
  border-right: 1px solid ${color.borderLightest};
  ${mixin.scrollableY}
  ${mixin.customScrollbar()}
  @media (max-width: 1100px) {
    width: ${sizes.secondarySideBarWidth - 10}px;
  }
  @media (max-width: 999px) {
    display: none;
  }
`;

const ProjectInfo = styled.div`
  display: flex;
  padding: 24px 4px;
`;

const ProjectTexts = styled.div`
  padding: 3px 0 0 10px;
`;

const ProjectName = styled.div`
  color: ${color.textDark};
  ${font.size(15)};
  ${font.medium};
`;

const ProjectCategory = styled.div`
  color: ${color.textMedium};
  ${font.size(13)};
`;

const Divider = styled.div`
  margin-top: 17px;
  padding-top: 18px;
  border-top: 1px solid ${color.borderLight};
`;

const LinkItem = styled.div`
  position: relative;
  display: flex;
  padding: 8px 12px;
  border-radius: 3px;
  ${mixin.clickable}
  ${props =>
    !props.to ? `cursor: not-allowed;` : `&:hover { background: ${color.backgroundLight}; }`}
  i {
    margin-right: 15px;
    font-size: 20px;
  }
  &.active {
    color: ${color.primary};
    background: ${color.backgroundLight};
    i {
      color: ${color.primary};
    }
  }
`;

const LinkText = styled.div`
  padding-top: 2px;
  ${font.size(14.7)};
`;

const NotImplemented = styled.div`
  display: inline-block;
  position: absolute;
  top: 7px;
  left: 40px;
  width: 140px;
  padding: 5px 0 5px 8px;
  border-radius: 3px;
  text-transform: uppercase;
  color: ${color.textDark};
  background: ${color.backgroundMedium};
  opacity: 0;
  ${font.size(11.5)};
  ${font.bold}
  ${LinkItem}:hover & {
    opacity: 1;
  }
`;

const ProjectCategoryVals = {
    SOFTWARE: 'software',
    MARKETING: 'marketing',
    BUSINESS: 'business',
  };
  
  const ProjectCategoryCopy = {
    [ProjectCategoryVals.SOFTWARE]: 'Software',
    [ProjectCategoryVals.MARKETING]: 'Marketing',
    [ProjectCategoryVals.BUSINESS]: 'Business',
  };
  


const propTypes = {
    project: PropTypes.object.isRequired,
  };
  
const ProjectSidebar = ({ project }) => {
    const match = useMatch();
  
    return (
      <Sidebar>
        <ProjectInfo>
          <ProjectAvatar />
          <ProjectTexts>
            <ProjectName>{project.name}</ProjectName>
            <ProjectCategory>{ProjectCategoryCopy[project.category]} project</ProjectCategory>
          </ProjectTexts>
        </ProjectInfo>
  
        {renderLinkItem(match, 'Kanban Board', 'board', '/board')}
        {renderLinkItem(match, 'Project settings', 'settings', '/settings')}
        <Divider />
        {renderLinkItem(match, 'Releases', 'shipping')}
        {renderLinkItem(match, 'Issues and filters', 'issues')}
        {renderLinkItem(match, 'Pages', 'page')}
        {renderLinkItem(match, 'Reports', 'reports')}
        {renderLinkItem(match, 'Components', 'component')}
      </Sidebar>
    );
  };
  
  const renderLinkItem = (match, text, iconType, path) => {
    const isImplemented = !!path;
  
    const linkItemProps = isImplemented
      ? { as: NavLink, exact: true, to: `${match.path}${path}` }
      : { as: 'div' };
  
    return (
      <LinkItem {...linkItemProps}>
        <Icon type={iconType} />
        <LinkText>{text}</LinkText>
        {!isImplemented && <NotImplemented>Not implemented</NotImplemented>}
      </LinkItem>
    );
  };
  
  ProjectSidebar.propTypes = propTypes;
  
  export default ProjectSidebar;