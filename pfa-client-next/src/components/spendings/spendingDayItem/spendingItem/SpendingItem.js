import {useEffect, useState} from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt, faFileInvoice } from '@fortawesome/free-solid-svg-icons';

import StyledSpendingItem from './StyledSpendingItem';
import InvoiceModal from "@components/spendings/invoiceModal/InvoiceModal";

import getCategoryComponent from '@components/common/Category';

import messages from '../../messages';
import cssSizes from "@src/css-sizes";


const SpendingItem = ({
  spending,
  editCallback,
  deleteCallback,
  toggleAddSpending,
}) => {
  const [hover, setHover] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);

  const isMobile = window.matchMedia(`(max-width: ${cssSizes.responsiveMaxWidth}px)`).matches;

  useEffect(() => {
    isMobile && setHover(true);
  }, []);

  const onMouseOver = () => { !isMobile && setHover(true) };
  const onMouseLeave = () => { !isMobile && setHover(false) };
  const openEditModal = () => editCallback(spending);

  const hideConfirm = () => {
    toggleAddSpending();
    setIsDeleteConfirmVisible(false);
  };

  const confirmDeletePopin = (item, deleteCallback) => {
    return (
      <div className="confirm-delete-popin">
        <span className="title">
          <FormattedMessage { ...messages.confirmDeleteTitle} />
        </span>
        <div className="button-container">
          <button
            className="cancel-button"
            onClick={() => hideConfirm()}
          >
            <FormattedMessage { ...messages.confirmDeleteCancelButton } />
          </button>
          <button
            className="confirm-button"
            onClick={
              () => {
                hideConfirm();
                deleteCallback(item.ID, item.itemType);
              }
            }>
            <FormattedMessage { ...messages.confirmDeleteConfirmButton} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <StyledSpendingItem>
      <div
        className="spending-item-container"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {
          isInvoiceModalVisible ?
            <InvoiceModal
              handleClickOutside={() => { !isMobile && setHover(false); setIsInvoiceModalVisible(!isInvoiceModalVisible) }}
              spending={spending}
            />
            :
            null
        }
        {
          !isDeleteConfirmVisible ?
            <div className="spending">
              <span className="label" title={spending.label}>{spending.label}</span>
              { spending?.category && getCategoryComponent(spending) }
              {
                hover ?
                  <>
                    <span
                      className={`invoice action ${spending.invoicefile && 'isPresent'}`}
                      title="display invoice"
                      onClick={() => {setIsInvoiceModalVisible(!isInvoiceModalVisible)}}
                    >
                      <FontAwesomeIcon icon={faFileInvoice} />
                    </span>
                    <span
                      className="edit action"
                      title="edit"
                      onClick={() => openEditModal()}
                    >
                      <FontAwesomeIcon icon={faPencilAlt} />
                    </span>
                    <span
                      className="delete action"
                      title="delete"
                      onClick={
                        () => {
                          toggleAddSpending();
                          setIsDeleteConfirmVisible(true);
                        }
                      }
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </span>
                  </>
                  :
                  null
              }
              <span className="amount">
                  {/* eslint-disable  react/style-prop-object */}
                <FormattedNumber
                  value={spending.amount}
                  style="currency"
                  currency={spending.currency}
                />
                </span>
            </div>
            :
            confirmDeletePopin(spending, deleteCallback)
        }
      </div>
    </StyledSpendingItem>
  )
}

export default SpendingItem;
