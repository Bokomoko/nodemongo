import { Router } from 'express'; // imports express router
import Tomadores from '../models/tomadores.js'; // imports tomadores model
const tomadoresRouter = Router(); // creates router

// the route will be assembled from the path in the index.js file and the path here
// the index.js file has the path /tomadores
// everything else will be /tomadores/...

// this equivalent to PUT to /tomadores
// entry point to add data to the tomadores collection
tomadoresRouter.post('/', async (req, res) => {
  // data from the client will be inside the body of the request
  const tomador = { ...req.body }
  if (!tomador.razaoSocial) {
    res.status(400).json({ error: "razaoSocial is required" })
    return
  }

  try {
    const { _id } = await Tomadores.create(tomador) // result will contain the data just inserted plus the _ID     console.log({ result })
    res.status(201).json({ _id })
  }
  catch (error) {
    res.status(500).json({ error })
  }
})

// this equivalent to GET to /tomadores
// list all tomadores
tomadoresRouter.get('/', async (req, res) => {
  try {
    console.log('list all tomadores')
    const tomadores = await Tomadores.find() // this query will return an array of tomadores
    res.status(200).json(tomadores)
  }
  catch (error) {
    res.status(500).json({ error })
  }
})

// this equivalent to GET to /tomadores/:id
// list a single tomador
tomadoresRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const tomador = await Tomadores.findById(id) // this
    if (!tomador) {
      res.status(404).json({ error: "Tomador not found" })
      return
    }
    res.status(200).json(tomador)
  }
  catch (error) {
    res.status(500).json({ error })
  }
})

// this equivalent to DELETE to /tomadores/:id
// delete a single tomador
tomadoresRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const tomador = await Tomadores.findByIdAndDelete(id)
    if (!tomador) {
      res.status(404).json({ error: "Tomador not found" })
      return
    }
    res.status(200).json(tomador)
  }
  catch (error) {
    res.status(500).json({ error })
  }
})

// this equivalent to PUT to /tomadores/:id
// update a single tomador
tomadoresRouter.put('/', async (req, res) => {
  const tomador = { ...req.body }
  if (!tomador._id) {
    res.status(400).json({ error: "_id is required" })
    return
  }

  try {
    const result = await Tomadores.findByIdAndUpdate(tomador._id, tomador, { new: true })
    if (!result) {
      res.status(404).json({ error: "Tomador not found" })
      return
    }
    res.status(200).json(result)
  }
  catch (error) {
    res.status(500).json({ error })
  }
})




export default tomadoresRouter
