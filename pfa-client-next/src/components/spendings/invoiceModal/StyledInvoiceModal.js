import styled from 'styled-components';
import cssSizes from "@src/css-sizes";
import colors from "@src/colors";
import { buttonMixin } from "@components/shared/sharedCSS/sharedFormsCSS";

const StyledInvoiceModal = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: ${colors.invoiceFileModalBackground};

  .modal-content {
    position: absolute;
    @media(max-width: ${cssSizes.responsiveMaxWidth}px) {
      width: 95%;
    }
    @media(min-width: ${cssSizes.responsiveMinWidth}px) {
      width: 500px;
    }
    height: 420px;
    
    background-color: ${colors.grey0};
    border-radius: 5px;
    overflow: hidden;

    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 5px;
      height: 40px;
      background-color: ${colors.grey01};
      border-bottom: 2px solid ${colors.grey1};
      font-weight: 600;
      
      .label {
        cursor: default;
        margin-left: 5px;
        max-width: 210px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .amount {
        margin-left: 10px;
      }

      .category {
        display: inline-block;
        margin-left: 10px;
        width: 104px;
        height: 18px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        line-height: 1.3;
        border: 1px solid ${colors.categoryBorder};
      }
    }
    
    // https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/
    // https://codepen.io/nopr/pen/rpsnd
    .inputfile-container {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 120px;

      .invoice-inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;

        & + .label-wrapper {
          display: flex;
                flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 120px;
          width: 100%;
          background-color: ${colors.grey0};
          
          label {
            display: flex;
            justify-content: center;
            color: ${colors.grey2};
            width: 90%;
            .input-filename {
              position: relative;
            }
            .choose-file {
              width: 230px;
              .upload-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                svg {
                  position: relative;
                  font-size: 60px;
                  &:hover {
                    cursor: pointer;
                    color: ${colors.addSpendingHover};
                  }
                }
              }
              .upload-choosefile-label {
                display: flex;
                justify-content: center;
                font-weight: 600;
                font-size: 19px;
              }
              .onlyformat {
                display: flex;
                justify-content: center;
                font-size: 11px;
                line-height: 1;
              }
            }
            .input-filename {
              font-size: 20px;
              font-weight: 700;
              &:hover {
                cursor: pointer;
                color: ${colors.addSpendingHover};
              }
            }
          }
        }
  
        // when using keyboard tab to select input
        //&:focus + .label-wrapper {
        //  label {
        //    color: orange;
        //    outline: 1px dotted #000;
        //  }
        //}
      }

      .upload-submit-btn {
        margin-top: 20px;
        ${buttonMixin};
      }
            
      .delete-btn {
        justify-content: center;
        ${buttonMixin};
      }
    }
    
    .image-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 250px;
      border-bottom: 2px solid ${colors.grey1};
      
      .no-invoice {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid ${colors.grey1};
        border-radius: 5px;
        font-size: 24px;
        text-align: center;
        width: 80%;
        height: 80%;
      }
  
      img {
        display: block;
        max-height: 245px;
        max-width: 100%;
      }

      .invoice-image {
        cursor: pointer;
        border: 1px solid ${colors.grey1};
        transition: box-shadow 0.15s ease-in;
    
        &:hover {
          box-shadow: 0 1px 8px 5px rgba(0,0,0,0.2);
        }
      }
    }
  }
`;

export default StyledInvoiceModal;
