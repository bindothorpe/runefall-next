import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";
import { stripe } from "@/lib/stripe";

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">
          Our Products
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedProducts.map((product) => {
            const price = product.default_price as Stripe.Price;
            const amount = price?.unit_amount ? price.unit_amount / 100 : 0;
            const currency = price?.currency?.toUpperCase() || "USD";

            return (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-gray-100">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      priority={false}
                      quality={85}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6 flex flex-col grow">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900">
                    {product.name}
                  </h2>

                  {product.description && (
                    <p className="text-gray-600 mb-4 text-sm grow">
                      {product.description}
                    </p>
                  )}

                  {/* Price */}
                  <div className="mt-auto">
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        {currency} {amount.toFixed(2)}
                      </span>
                      {price?.recurring && (
                        <span className="text-gray-600 text-sm ml-2">
                          / {price.recurring.interval}
                        </span>
                      )}
                    </div>

                    {/* Metadata (optional) */}
                    {product.metadata &&
                      Object.keys(product.metadata).length > 0 && (
                        <div className="mb-4 text-xs text-gray-500">
                          {Object.entries(product.metadata).map(
                            ([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span>{" "}
                                {value}
                              </div>
                            )
                          )}
                        </div>
                      )}

                    {/* Buy Button */}
                    <Link
                      href={`/checkout?priceId=${price?.id}`}
                      className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            );
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
