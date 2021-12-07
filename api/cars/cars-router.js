const router = require('express').Router()

const Cars = require('./cars-model')

// - [GET] /api/cars returns an array of cars sorted by id (or an empty array if there aren't any)
router.get('/', async (req, res, next) => {
  try {
    const cars = await Cars.getAll()
    res.json(cars)
  } catch (err) {
    next(err)
  }
})

// - [GET] /api/cars/:id returns a car by the given id
router.get('/:id', async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    res.json(car)
  } catch (err) {
    next(err)
  }
})

// - [POST] /api/cars returns the created car
router.post('/', async (req, res, next) => {
  try {
    const car = await Cars.create(req.body)
    res.json(car)
  } catch (err) {
    next(err)
  }
})

// eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router
