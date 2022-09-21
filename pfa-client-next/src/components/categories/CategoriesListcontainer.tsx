import Layout from "@components/shared/Layout";
import useCategories from "@components/spendings/services/useCategories";
import CategoryItem from "@components/categories/CategoryItem";
import Spinner from "@components/common/Spinner";


interface Category {
  ID: string;
  userID: string;
  name: string;
  color: string;
};

const CategoriesListcontainer = () => {
  const { categories } = useCategories();

  return (
    <Layout>
      <div className="flex flex-col md:mt-20 pl-1 space-y-2">
        <div className="ml-1 font-ubuntu text-grey3 font-bold underline">
          Nombre de catégories : {categories?.data.length}
        </div>
        {categories?.data.length > 0 ?
          categories!.data
            .sort((c1: Category, c2: Category) => c1.name.localeCompare(c2.name))
            .map((category: Category) => (
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
    </Layout>
  )
}

export default CategoriesListcontainer;
