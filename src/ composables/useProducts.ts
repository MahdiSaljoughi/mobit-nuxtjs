// const useProducts = async () => {
//   const loading = false;
//   const fetchAllPages = async () => {
//     const { data } = (await useFetch(`/api/page`)) as any;
//     return data;
//   };

//   const fetchPageBySlug = async (slug: string) => {
//     const { data } = await useFetch<Post>(`/api/page/${slug}`);
//     return data;
//   };

//   return {
//     fetchAllPages,
//     fetchPageBySlug,
//   };
// };
// export default useProducts;
