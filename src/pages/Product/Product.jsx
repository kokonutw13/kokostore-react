import { useEffect, useState } from "react";
import { Pagination, ProductList } from "./components";
import { useFetch } from "../../hooks/useFetch";
import { ErrorMessage, Loading, Recomendation } from "../../components";

const totalProducts = 14;

export const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [products, setProducts] = useState([]);

  const URL = `https://kokostore-express.onrender.com/products/paginated/?page=${currentPage}&limit=6`;

  const { data, isLoading, hasError, error, refetch } = useFetch(URL);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1 overflow-hidden">
          {isLoading ? (
            <Loading />
          ) : hasError ? (
            <ErrorMessage
              message={error.message || "Error al cargar los productos"}
              onRetry={refetch}
            />
          ) : (
            <div className="grid h-full grid-cols-3 gap-4">
              {products.map((product) => (
                <ProductList key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalProducts}
        />
      </div>

      <div className="w-80 overflow-hidden border-l border-gray-200 p-6">
        <Recomendation />
      </div>
    </div>
  );
};