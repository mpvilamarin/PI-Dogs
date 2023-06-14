const { Dog } = require('../db');

const deleteDog = async (id) => {
  if (!id) {
    throw new Error('This dog does not exist');
  } else if (!/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)) {
    throw new Error('Invalid ID');
  }

  const foundDog = await Dog.findByPk(id);

  if (!foundDog) {
    throw new Error('Dog not found');
  }

  await foundDog.destroy();

  return foundDog;
};

module.exports = {
  deleteDog
};