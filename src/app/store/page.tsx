import { Suspense } from "react";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import ProductCard from "../components/store/ProductCard";
import { lexend } from "../fonts";
import CustomSeparator from "../components/CustomSeparator";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton component for product cards
function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg border bg-card overflow-hidden">
      <Skeleton className="w-full h-48" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-4">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-28" />
        </div>
      </div>
    </div>
  );
}

// Loading component for the products grid
function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {[...Array(6)].map((_, i) => (
        <ProductCard key={i} skeleton />
      ))}
    </div>
  );
}

// Separate component for the products list
async function ProductsList() {
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

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12">
        <p className="text-xl">No products available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {sortedProducts.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="relative -mt-24 bg-[url('/images/background/store_background_with_gradient.png')] bg-position-[center_top] w-full bg-no-repeat min-h-screen">
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

        <Suspense fallback={<ProductsGridSkeleton />}>
          <ProductsList />
        </Suspense>

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
