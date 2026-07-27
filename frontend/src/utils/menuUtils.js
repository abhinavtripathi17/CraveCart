export const filterFoodItems = (foodList, category, searchQuery = "") => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return foodList.filter((item) => {
    const matchesCategory =
      category === "All" || item.category?.toLowerCase() === category.toLowerCase();

    const matchesSearch =
      !normalizedQuery ||
      item.name?.toLowerCase().includes(normalizedQuery) ||
      item.description?.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesSearch;
  });
};
