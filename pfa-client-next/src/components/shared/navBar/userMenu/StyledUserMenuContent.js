import styled from 'styled-components';
import StyledContent from '@components/common/dropdown/StyledContent';
import cssSizes from '@src/css-sizes';
import colors from '@src/colors';

const StyledUserMenuContent = styled(StyledContent)`
  top: 30px;
  left: 0;
  @media(max-width: ${cssSizes.responsiveMaxWidth}px) {
    width: 200px;
  }
  @media(min-width: ${cssSizes.responsiveMinWidth}px) {
    width: 240px;
  }
  background-color: ${colors.grey2};
  padding: 5px;
  box-shadow: 0 1px 10px 1px rgba(100, 100, 100, 0.6);
  
  .dropdownitems {
    padding: 5px;
    &:hover {
      background-color: ${colors.grey0};
      color: ${colors.blueNavy};
    }
    .icon {
      margin: 0 10px 0 5px;
    }
  }
`;

export default StyledUserMenuContent;
