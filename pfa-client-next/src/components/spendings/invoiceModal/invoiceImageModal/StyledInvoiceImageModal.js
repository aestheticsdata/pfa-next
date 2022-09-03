import styled from 'styled-components';

const StyledInvoiceImageModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #d2d2d2;
  z-index: 1;

  .image-container-fullsize {
    position: absolute;
    max-height: 100%;
    overflow-y: auto;

    img {
      width: 100%;
    }
  }
`;

export default StyledInvoiceImageModal;
