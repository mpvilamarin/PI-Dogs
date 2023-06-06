const { Dog } = require('../db');

const deleteDog = async (id) => {
  if (!id) {
    throw new Error('This dog does not exist');
  } else if (typeof id === 'number') {
    throw new Error('You cannot delete this dog');
  }

  const foundDog = await Dog.findByPk(id);

  if (!foundDog) {
    throw new Error('Dog not found');
  }

  await foundDog.delete();

  return foundDog;
};

module.exports = {
  deleteDog
};