import Image from "next/image";
import Layout from "@components/shared/Layout";
import spinner from "@src/assets/Wedges-3s-200px.svg";
import useCategories from "@components/spendings/services/useCategories";
import CategoryItem from "@components/categories/CategoryItem";

const CategoriesListcontainer = () => {
  const { data: categories } = useCategories();

  return (
    <Layout>
      <div className="flex flex-col md:mt-20 pl-1">
        {categories?.data.length > 0 ?
          categories!.data
            .sort((c1, c2) => c1.name.localeCompare(c2.name))
            .map(category => (
              <CategoryItem
                key={category.ID}
                category={category}
              />
            )
          )
          :
          <div>
            <Image
              alt="spinner"
              src={spinner}
              width={60}
              height={60}
            />
          </div>
        }
      </div>
    </Layout>
  )
}

export default CategoriesListcontainer;
