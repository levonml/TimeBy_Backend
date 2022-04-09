/* eslint-disable no-undef */
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app'
import User from '../src/models/userModel'
import helper from './test_helper'

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany()
  await User.insertMany(helper.initialUsers)
})
test('notes are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
test('user credentials are currect', async () => {
  const users = await api.get('/api/users')
  expect(users.body[0]).toMatchObject({ name: 'Lyova' })
  expect(users.body).toHaveLength(1)
})

test('signup service', async () => {
  await api
    .post('/api/signup')
    .send(helper.oneUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const newUsers = await api.get('/api/users')
  const nameArray = newUsers.body.map((r) => r.name)
  let usersProcessed = await helper.usersFromDatabase()
  usersProcessed = usersProcessed.map((r) => r.name)

  expect(usersProcessed.length).toBe(helper.initialUsers.length + 1)
  expect(nameArray).toContain(helper.oneUser.name)
  expect(usersProcessed).toContain(helper.oneUser.name)
})

afterAll(() => {
  mongoose.connection.close()
})
