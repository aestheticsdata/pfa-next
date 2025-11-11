import useCategories from "@components/spendings/services/useCategories";
import CategoryItem from "@components/categories/CategoryItem";
import Spinner from "@components/common/Spinner";


interface CategoryItemProps {
  ID: string;
  userID: string;
  name: string;
  color: string;
};

const CategoriesListcontainer = () => {
  const { categories } = useCategories();

  return (
    <div className="flex flex-col md:mt-20 pl-1 space-y-2">
      <div className="ml-1 font-ubuntu text-grey3 font-bold underline">
        Nombre de catégories : {categories?.data?.length || 0}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {categories?.data && categories.data.length > 0 ?
        categories.data
          .sort((c1: CategoryItemProps, c2: CategoryItemProps) => c1.name.localeCompare(c2.name))
          .map((category: CategoryItemProps) => (
            <CategoryItem
              key={category.ID}
              category={category}
            />
          )
        )
        :
        <div>
          <Spinner />
        </div>
      }
      </div>
    </div>
  )
}

export default CategoriesListcontainer;
