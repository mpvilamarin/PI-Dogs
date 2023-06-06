const { Dog, Temperament } = require('../db.js');
const { Op } = require('sequelize');
const { getAllTemps } = require('./getAllTemps');

const postDogs = async (name, height, weight, age, image, temperament, createInDb) => {
    
    const dbResponse = await Dog.findAll({  // Busca si ya existe una raza con el mismo nombre 
        where: {
            name: {
                [Op.iLike]: `%${name}%`,      // Op.iLike -> para buscar sin importar mayúsculas o minúsculas
            },
        },
    });
    console.log(dbResponse);
    if (dbResponse.length) throw new Error("There is already a race with that name");
    // Si la base de datos ya tiene una raza con ese nombre devuelve un mensaje
    // Si no existe una raza con ese nombre, crea una
    const newDog = await Dog.create({
        name: name,
        height: height,
        weight: weight,
        age: age,
        image: image,
        createInDb: true,
    });

    const temperamentCount = await Temperament.count();
    if (temperamentCount === 0) {
        await getAllTemps();
    }
    const tempsFound = [];
    for (let i = 0; i < temperament.length; i++) {
        const tempFound = await Temperament.findOne({ where: { name: temperament[i] } });
        if (!tempFound) {
            throw new Error(`Tipo de ${temperament[i]} no existe`);
        }
        tempsFound.push(tempFound);
    }
    // Se añade el temperamento mediante método add de SQL, por la relación entre Dog y Temperament
    await newDog.addTemperament(tempsFound);
    return newDog;
}

module.exports = {
    postDogs
}