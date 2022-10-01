export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number / 10);
};

export const getUniqueValues = (data, type) => {
  return ['all', ...new Set(data.map((item) => item[type]).flat())];
};
