const BASE_URL = `http://localhost:3000/api/products`;

export const ProductService = {
  async getAll(): Promise<{ products: TProduct[] }> {
    try {
      const res = await $fetch<{ products: TProduct[] }>(BASE_URL);
      return res;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },
};
