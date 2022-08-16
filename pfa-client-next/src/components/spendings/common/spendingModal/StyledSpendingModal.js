import styled from 'styled-components/macro';
import cssSizes from '@src/css-sizes';
import colors from '@src/colors';
import {
  buttonMixin,
  inputMixin,
} from '@components/shared/sharedCSS/sharedFormsCSS';

/*
const inputMixin = css`
  // hack to remove in Chrome, input colors
  // https://webagility.com/posts/the-ultimate-list-of-hacks-for-chromes-forced-yellow-background-on-autocompleted-inputs
  // https://stackoverflow.com/questions/34551637/css-webkit-transition-not-working-on-input-type
  // https://github.com/styled-components/styled-components/issues/492
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-transition-delay: 9999s;
  }
  // ////////////////////////////////////////
  color: inherit;
  font-size: 15px;
  background-color: transparent;
  border-bottom: 1px solid ${colors.formsGlobalColor};
  margin: 8px 0;
  outline: none;
  width: 100%;
  padding-bottom: 10px;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${colors.formsGlobalColor};
    transition: all .2s ease;
  }
`;
 */

import {
  containerWidth,
  containerWidthdashboard,
  containerHeight,
  containerHeightdashboard,
} from '../../spendingDayItem/StyledSpendingDayItem';

const StyledSpendingModal = styled.div`
  position: absolute;
  top: 33px;
  right: 0;
  background-color: ${colors.spendingItemHover};
  border: 1px solid ${colors.spendingActionHover};
  border-radius: 5px;
  color: ${colors.blueNavy};
  @media(max-width: ${cssSizes.responsiveMaxWidth}px) {
    width: 450px;
  }
  @media(min-width: ${cssSizes.responsiveMinWidth}px) {
    width: ${props => props.recurringType ? (containerWidthdashboard-22) + 'px' : (containerWidth-22) + 'px'};
  }
  height: ${props => props.recurringType ? (containerHeightdashboard-53)+'px' : (containerHeight-53)+'px'};
  padding: 0 10px;
  
  input {
    ${inputMixin};
  }
  
  .spending-btn {
    ${buttonMixin};
    
    display: block;
    margin: 10px auto;
    width: 50%;
    height: 20px;

    &.copy-recurrings {
      font-size: 10px;
    }
  }
`;

export default StyledSpendingModal;
