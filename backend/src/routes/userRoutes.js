import { Router } from 'express'
import CustomerController from '../controllers/CustomerController.js'
import CustomerRepository from '../repositories/CustomerRepository.js'

const router = new Router()
const customerRepository = new CustomerRepository()
const customerController = new CustomerController(customerRepository)

router.get('/', (req, res) => customerController.index(req, res))
router.post('/', (req, res) => customerController.store(req, res))
router.get('/:userId', (req, res) => customerController.show(req, res))
router.put('/:userId', (req, res) => customerController.update(req, res))
router.delete('/:userId', (req, res) => customerController.delete(req, res))

export default router
