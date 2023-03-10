export default class UserController {
  constructor(customerRepository) {
    this.customerRepository = customerRepository
  }

  async index(req, res) {
    try {
      const users = await this.customerRepository.index()
      res.status(200).json(users)
    } catch (error) {
      res.status(400)
    }
  }

  async store(req, res) {
    try {
      const newUser = await this.customerRepository.store(req.body)
      res.status(201).json(newUser)
    } catch (error) {
      res.status(400)
    }
  }

  async show(req, res) {
    try {
      const returnedUser = await this.customerRepository.show(req.params.userId)
      res.status(200).json(returnedUser)
    } catch (error) {
      res.status(400)
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await this.customerRepository.update(req.params.userId, req.body)
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(400)
    }
  }

  async delete(req, res) {
    try {
      const deletedUser = await this.customerRepository.delete(req.params.userId)
      res.status(200).json(deletedUser)
    } catch (error) {
      res.status(400)
    }
  }
}
