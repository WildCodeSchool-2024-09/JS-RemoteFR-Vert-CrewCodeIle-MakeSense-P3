type CategoryColors = {
  [key: string]: string;
};

export const categoryColors: CategoryColors = {
  Economie: "#FDE68A", // Light yellow
  Ecologie: "#A7F3D0", // Light green
  Politique: "#BFDBFE", // Light blue
  Paris: "#FDA4AF", // Light pink
  Culture: "#DDD6FE", // Light purple
  Evènement: "#FCD34D", // Gold
  default: "#E5E7EB", // Light gray (default)
};

export const getCategoryColor = (category: string): string => {
  return categoryColors[category] || categoryColors.default;
};
