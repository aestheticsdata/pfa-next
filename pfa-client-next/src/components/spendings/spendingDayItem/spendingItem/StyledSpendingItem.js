import styled from 'styled-components';
import colors from '@src/colors';
import StyledDeleteConfirm from "@components/common/StyledDeleteConfirm";

const labelWidth = 150;

const StyledSpendingItem = styled.div`
    .spending-item-container {
        position: relative;
        margin: 0 10px;
        width: 94%;
        height: 18px;
        padding: 14px 0;
        background-color: ${colors.grey0};
        transition: background-color 150ms linear;

        &:hover {
            background-color: ${colors.spendingItemHover};
        }

        .spending {
            position: absolute;
            width: 100%;
            left: 0;
            top: 5px;
            user-select: none;


            .label {
                position: absolute;
                width: ${labelWidth}px;
                height: 18px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .category {
                position: absolute;
                width: 104px;
                height: 18px;
                left: ${labelWidth + 25}px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                text-align: center;
                line-height: 1.3;
                border: 1px solid ${colors.categoryBorder};
            }

            .amount {
                position: absolute;
                right: 0;
            }

            .action {
                position: absolute;
                cursor: pointer;
                color: ${colors.grey1};
                transition: color 150ms linear;

                &:hover {
                    color: ${colors.spendingActionHover};
                }

                &.invoice {
                    right: 120px;

                    &.isPresent {
                        color: ${colors.invoiceImageIsPresent};

                        &:hover {
                            color: ${colors.invoiceImageIsPresentHover};
                        }
                    }
                }

                &.edit {
                    right: 98px;
                }

                &.delete {
                    right: 78px;
                }
            }
        }

        ${StyledDeleteConfirm}
    }`;

export default StyledSpendingItem;




