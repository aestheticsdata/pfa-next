import styled, { css } from 'styled-components';

const stripes = css`
  background: repeating-linear-gradient(
    135deg,
    white,
    white 10px,
    #eee 10px,
    #eee 11px
  );
`;

const StyledCategoryBar = styled.div`
  background-color: ${props => props.bgcolor || '#fff'};
  ${props => props.bgcolor === null && stripes}
  .bar {
    height: 100%;
    span {
      line-height: 1.7;
      padding-left: 2px;
    }
  }
`;

export default StyledCategoryBar;
