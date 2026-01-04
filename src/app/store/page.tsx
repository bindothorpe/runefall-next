import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import ProductCard from "../components/store/ProductCard";
import { lexend } from "../fonts";
import { Separator } from "@/components/ui/separator";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    active: true,
    expand: ["data.default_price"],
  });

  // Sort products by price (low to high)
  const sortedProducts = [...products.data].sort((a, b) => {
    const priceA = a.default_price as Stripe.Price;
    const priceB = b.default_price as Stripe.Price;

    const amountA = priceA?.unit_amount || 0;
    const amountB = priceB?.unit_amount || 0;

    return amountA - amountB;
  });

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1
          className={`text-5xl font-bold text-center mb-2 ${lexend.className}`}
        >
          STORE
        </h1>
        <p className="text-center text-xl">Purchase in game Runes or Ranks</p>

        <div className="w-full h-0.5 bg-gradient-to-r from-[#4d475f00] via-[#4D475F] to-[#4d475f00] my-12"></div>
        <h1
          className={`text-4xl font-semibold text-center mb-8 ${lexend.className}`}
        >
          Runes
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-xl">No products available at the moment.</p>
          </div>
        )}

        <div className="w-full h-0.5 bg-gradient-to-r from-[#4d475f00] via-[#4D475F] to-[#4d475f00] my-12"></div>
        <h1
          className={`text-4xl font-semibold text-center mb-8 ${lexend.className}`}
        >
          Ranks
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedProducts.slice(0, 3).map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-xl">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
