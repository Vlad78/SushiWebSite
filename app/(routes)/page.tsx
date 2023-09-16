import getStories from "@/actions/get-stories";
import getProducts from "@/actions/get-products";
import getCategories from "@/actions/get-categories";
import ProductList from "@/components/product-list";
import Stories from "@/components/stories";
import Container from "@/components/ui/container";
import MainNav from "../../components/main-nav";
import style from "./page.module.scss";
import MasonryMain from "../../components/masonry-main";

export const revalidate = 0;

const HomePage = async () => {
  const { data: categories } = await getCategories({ isFeatured: true });
  const { data: products } = await getProducts({ isFeatured: true });
  const { data: stories } = await getStories();

  return (
    <Container>
      {/* <div className={`${style["main-container"]}`}> */}

      <Stories data={stories} />

      {/* <MainNav data={categories} /> */}
      <div className={`${style["paralax-container"]} ${style["items-field"]} pb-10`}>
        <h2>Polecane produkty</h2>
        <MasonryMain categories={categories} products={products} stories={stories} />
      </div>
      {/* <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Polecane produkty" items={products} />
        </div> */}
      {/* </div> */}
    </Container>
  );
};

export default HomePage;

// в сетке предложения нужно увидеть: категории, товары, акции
// то есть объект должен уметь переварить: карточку товара, картинку с текстом
