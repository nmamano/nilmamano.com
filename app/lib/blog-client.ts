// Client-side filtering function
export function filterPostsByCategory(posts: any[], category: string) {
  return posts.filter((post) =>
    post.categories?.some(
      (postCategory: string) =>
        postCategory.toLowerCase() === category.toLowerCase()
    )
  );
}
