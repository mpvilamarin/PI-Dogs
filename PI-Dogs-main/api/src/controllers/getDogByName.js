const { getAllDogs } = require('./getAllDogs')
const { getDbDogs } = require('./getDbDogs')

const getDogsByName = async (name) => {
    const allDogs = await getAllDogs();
    const dbDogs = await getDbDogs();
    return [...allDogs, ...dbDogs].filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));
}; // Se juntan los perros de DB con los de la api y filtra por nombre para el Route

module.exports = {
    getDogsByName,
}