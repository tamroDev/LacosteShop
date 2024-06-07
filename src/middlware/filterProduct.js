const filterData = (id, data) => {
  const newData = data.filter((item) => item._id === id);

  return newData;
};

module.exports = filterData;
