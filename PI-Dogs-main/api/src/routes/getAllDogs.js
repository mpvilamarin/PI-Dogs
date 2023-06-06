const { Router } = require('express');
const { getAllDogs } = require('../controllers/getAllDogs')
const router = Router();

router.get("/", async (req, res) => {
    const name = req.query.name;
    const allDogs = await getAllDogs();
    try {
        if (name) {
            const dogFound = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())) // Se filtra lo que llega por query y paarsea a minúscula 
            dogFound.length ? res.status(200).send(dogFound) : res.status(404).json({ msg: "Dog not found" }) // asi coinciden con los datos que dé el usuario
        } else return res.status(200).send(allDogs)
    } catch (error) {
        return res.status(404).send(error.message)
    }
})

module.exports = router;