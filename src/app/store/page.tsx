import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import ProductCard from "../components/store/ProductCard";
import { lexend } from "../fonts";
import CustomSeparator from "../components/CustomSeparator";

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
    <div className="relative -mt-24 bg-[url('/images/background/store_background_with_gradient.png')] bg-position-[center_top] w-full bg-no-repeat min-h-screen">
      {/* <div
        className="-z-1 absolute inset-0 bg-gradient-to-b from-[#220548] via-[#22054880] to-transparent pointer-events-none"
        style={{ height: "50vh" }}
      ></div> */}
      <div className="container mx-auto px-4 py-12 max-w-5xl pt-32">
        <h1
          className={`text-5xl text-transparent bg-clip-text bg-(image:--text-gradient) font-bold text-center mb-2 ${lexend.className}`}
        >
          STORE
        </h1>
        <p className="text-center text-xl">Purchase in game Runes or Ranks</p>

        <CustomSeparator squareSize={16} lineWidth={2} className="my-12" />

        <h1
          className={`text-4xl font-semibold text-center mb-8 ${lexend.className}`}
        >
          Runes
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedProducts.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            <p className="text-xl">No products available at the moment.</p>
          </div>
        )}

        <CustomSeparator squareSize={16} lineWidth={2} className="my-12" />

        <h1
          className={`text-4xl font-semibold text-center mb-8 ${lexend.className}`}
        >
          Ranks
        </h1>
        <p
          className={`text-6xl font-semibold text-center mt-24 mb-40 runefall-text-gradient ${lexend.className}`}
        >
          COMING SOON
        </p>
        <CustomSeparator squareSize={16} lineWidth={2} className="my-12" />
      </div>
    </div>
  );
}
