const vinValidator = require('vin-validator')

const Cars = require('./cars-model')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)

    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { make, model, mileage, title, transmission } = req.body

  if (typeof make !== 'string' || make.length === 0) {
    next({ status: 400, message: 'make is missing' })
  } else if (typeof model !== 'string' || make.length === 0) {
    next({ status: 400, message: 'model is missing' })
  } else if (typeof mileage !== 'number' || mileage < 0) {
    next({ status: 400, message: 'mileage is missing' })
  } else {
    req.car = {
      make,
      model,
      mileage,
      title,
      transmission,
    }
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body

  if (vin === undefined) {
    next({ status: 400, message: `vin is missing` })
  } else if (!vinValidator.validate(vin)) {
    next({ status: 400, message: `vin ${vin} is invalid` })
  } else {
    req.car.vin = req.params.vin
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const cars = await Cars.getAll()
  const { vin } = req.car

  if (cars.contains((car) => car.vin === vin)) {
    next({ status: 400, message: `vin ${vin} already exists` })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
