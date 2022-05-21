import styled, { css } from 'styled-components/macro';
import cssSizes from '@src/css-sizes';
import colors from '@src/colors';

export const containerWidth = 485;
export const containerWidthdashboard = 350;
export const containerHeight = 330;
export const containerHeightdashboard = 250;

const itemslistcontainer = css`
  overflow: hidden;
  overflow-y: auto;

  .spinner {
    text-align: center;
    padding-top: 60px;
  }
`;

const StyledSpendingDayItem = styled.div`
  @media(max-width: ${cssSizes.responsiveMaxWidth}px) {
    zoom: 0.8;
  }
  width: ${props => props.recurringType ? containerWidthdashboard+'px' : containerWidth+'px' };
  height: ${props => props.recurringType ? containerHeightdashboard+'px' : containerHeight+'px'};
  background: ${colors.grey0};
  border: 1px solid ${colors.grey2};
  margin: ${props => props.recurringType ? 'initial' : '20px 10px'};
  padding: 10px;
  border-radius: 5px;
  
  &.today-border {
    border: 1px solid ${colors.datePickerWrapper};    
  } 

  .spending-modal {
    position: relative;
    z-index: 1;
  }
  
  .header {
    width: 100%;
    height: 30px;
    
    .recurrings {
      float: left;
      text-align: center;
      font-weight: 800;
      width: ${containerWidthdashboard-50}px;;
      color: ${colors.grey2};
      border: 1px solid ${colors.grey2};
      border-radius: 5px;
      padding: 5px;
      margin-bottom: 5px;
    }
    
    .date {
      float: left;
      text-align: center;
      font-weight: 800;
      @media(max-width: ${cssSizes.responsiveMaxWidth}px) {
        width: ${containerWidth-70}px;
      }
      @media(min-width: ${cssSizes.responsiveMinWidth}px) {
        width: ${containerWidth-50}px;
      }
      color: #0a313f;
      border: 1px solid ${colors.grey2};
      background-color: ${colors.grey1};
      border-radius: 5px;
      padding: 5px;
      margin-bottom: 5px;
      &.today {
        background-color: ${colors.datePickerWrapper};
      }
    }
    
    .add-spending {
      float: right;
      margin-top: 6px;
      user-select: none;
      cursor: pointer;
      color: ${colors.grey1};
      font-size: 18px;
      
      &:hover {
        color: ${colors.addSpendingHover};
      }
      
      &.disabled {
        cursor: not-allowed;
        &:hover {
          color: ${colors.grey1};
        }
      }
    }
  }
  
  .total {
    text-align: center;
    margin: 10px 0;
    border-bottom: 1px solid ${colors.grey2};
    padding-bottom: 10px;
    
    .total-label {
      text-transform: uppercase;
      margin-right: 5px;
    }
    
    .total-amount {
      font-weight: 800;
    }
  }
  
  .recurrings-list-container {
    ${itemslistcontainer};
    height: 120px;
  }
  
  .spendings-list-container {
    ${itemslistcontainer};
    height: 200px;
  }
`;

export default StyledSpendingDayItem;
