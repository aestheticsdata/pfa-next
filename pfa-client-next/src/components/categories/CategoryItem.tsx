import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import getCategoryComponent from "@components/common/Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrashAlt } from "@fortawesome/free-solid-svg-icons";


const CategoryItem = ({ category }) => {
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [singleCategory, setSingleCategory] = useState(category);
  const initialCategory = {...category};
  // const updateError = useSelector(state=>state.categoriesReducer);
  // const updateErrorMessage = useSelector(state => state.categoriesReducer.errorMessage);

  // useEffect(() => {
  //   if (updateErrorMessage !== '' && updateError.ID === category.ID) {
  //     setSingleCategory(initialCategory);
  //     Swal.fire({
  //       title: 'Error',
  //       text: updateErrorMessage.errors[0].message,
  //       confirmButtonText: 'close',
  //     })
  //   }
  // }, [updateError]);

  const deleteCallback = () => {
    // dispatch(deleteCategory(category));
    setIsDeleteConfirmVisible(false);
  };

  const item = {
    category: singleCategory.name,
    categoryColor: singleCategory.color,
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setSingleCategory(initialCategory);
  }

  const commitEditing = () => {
    setIsEditing(false);
    // dispatch(updateCategory(singleCategory));
  }

  const confirmDeletePopin = (item, deleteCallback) => {
    return (
      <div className="confirm-delete-popin">
        <span className="title">
          Confirmer la suppression
        </span>
        <div className="button-container">
          <button
            className="cancel-button"
            onClick={() => setIsDeleteConfirmVisible(false)}
          >
            Annuler
          </button>
          <button
            className="confirm-button"
            onClick={
              () => {
                setIsDeleteConfirmVisible(false);
                deleteCallback(item.ID);
              }
            }>
            Effacer
          </button>
        </div>
      </div>
    );
  };

  const editCategoryPopin = () => {
    return (
      <div className="edit-category-popin">

        <input
          type="text"
          className="edit-category-popin-name"
          value={singleCategory.name}
          onChange={(ev) => setSingleCategory({...singleCategory, name: ev.target.value})}
          onKeyPress={(keypressEvent) => { keypressEvent.code === 'Enter' && commitEditing() }}
        />

        <input
          type="color"
          className="edit-category-popin-color"
          value={singleCategory.color}
          onChange={(ev) => setSingleCategory({...singleCategory, color: ev.target.value})}
        />

        <button
          className="cancel-button"
          onClick={() => { cancelEditing() }}
        >
          Annuler
        </button>

        <button
          className="confirm-button"
          onClick={() => { commitEditing() }}
        >
          Modifier
        </button>

      </div>
    );
  };

  const actionsFragment = () => (
    <div className="flex w-1/5 justify-between text-grey3">
      <div
        className="cursor-pointer hover:text-grey0"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <FontAwesomeIcon icon={faPencilAlt} />
      </div>
      <div
        className="cursor-pointer hover:text-grey0 transition-colors ease-linear duration-200"
        onClick={() => { setIsDeleteConfirmVisible(true) }}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </div>
    </div>
  );

  const getCategoryContainer = () => {
    if (isDeleteConfirmVisible) return confirmDeletePopin(category, deleteCallback);
    if (isEditing) return editCategoryPopin();
    return (
      <div className="flex justify-between items-center">
        <div className="w-[120px]">
          { getCategoryComponent(item) }
        </div>
        { actionsFragment() }
      </div>
    );
  }

  return (
    <div className="w-[260px] hover:shadow-categories hover:rounded p-1 transition-colors ease-linear duration-100">
      { getCategoryContainer() }
    </div>
  );
};

export default CategoryItem;
