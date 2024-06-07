const readApiCategory = async (endPoint) => {
  try {
    const response = await fetch(endPoint);

    if (!response.ok) {
      throw new Error("Cannot fetch data");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
};

module.exports = readApiCategory;
