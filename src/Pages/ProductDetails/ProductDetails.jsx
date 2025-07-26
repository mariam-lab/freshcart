import { useParams } from "react-router";
import ProductDetailsTabs from "../../Components/ProductDetailsTabs/ProductDetailsTabs";
import ProductInfo from "../../Components/ProductInfo/ProductInfo";
import RelatedProducts from "../../Components/RelatedProducts/RelatedProducts";
import { useEffect } from "react";
import { useState } from "react";
import { getProductById } from "../../../services/products-service";
import Loading from "../../Components/Loading/Loading";
export default function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, SetIsError] = useState(false);
  const { id } = useParams();
  async function fetchProductDetails() {
    try {
      setIsLoading(true);
      const response = await getProductById(id);
      if (response.success) {
        setIsLoading(false);
        setProductDetails(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      SetIsError(true);
    }
  }
  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <ProductInfo productDetails={ProductDetails} />
      <ProductDetailsTabs productDetails={ProductDetails} />
      <RelatedProducts productDetails={ProductDetails} />
    </>
  );
}
