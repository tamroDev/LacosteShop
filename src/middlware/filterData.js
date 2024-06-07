const filterData = (category, data) => {
  const newData = data.filter((item) => item.category === category);

  return newData;
};

module.exports = filterData;
