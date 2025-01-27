import prisma from "../../../../prisma/prisma";

export default defineEventHandler(async () => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      variants: true,
    },
  });

  return {
    products: products.map((product) => ({
      id: product.id,
      title: product.title,
      title_eng: product.title_eng,
      slug: product.slug,
      price: product.price ?? "Price not available",
      discount_percentage: product.discount_percentage,
      price_after_discount: product.price
        ? product.discount_percentage
          ? product.price * (1 - product.discount_percentage / 100)
          : product.price
        : "Price not available",
      description: product.description,
      created_at: product.created_at,
      updated_at: product.updated_at,
      images: product.images.map((image) => ({
        id: image.id,
        url: image.url,
      })),
      variants: product.variants.map((variant) => ({
        id: variant.id,
        attributes: variant.attributes,
        price: variant.price ?? "Price not available",
        discount_percentage: variant.discount_percentage,
        price_after_discount: variant.price
          ? variant.discount_percentage
            ? variant.price * (1 - variant.discount_percentage / 100)
            : variant.price
          : "Price not available",
        quantity: variant.quantity,
      })),
    })),
  };
});
