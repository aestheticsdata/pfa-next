import { SpendingCompoundType } from "@components/spendings/types";
import { useState } from "react";

const useSpendingDayItem = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addSpendingEnabled, setAddSpendingEnabled] = useState(true);
  const [spending, setSpending] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const addSpending = () => {
    setIsModalVisible(true);
    setAddSpendingEnabled(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setAddSpendingEnabled(true);
    setSpending({});
    setIsEditing(false);
  };

  const toggleAddSpending = () => {
    setAddSpendingEnabled(!addSpendingEnabled);
  };

  const editSpending = (spending: SpendingCompoundType) => {
    setIsEditing(true);
    setIsModalVisible(true);
    setAddSpendingEnabled(false);
    setSpending(spending);
  };

  return {
    isModalVisible,
    addSpendingEnabled,
    spending,
    isEditing,
    addSpending,
    closeModal,
    toggleAddSpending,
    editSpending,
  }
}

export default useSpendingDayItem;

