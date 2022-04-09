import User from '../src/models/userModel'

const initialUsers = [
  {
    name: 'Lyova',
    surname: 'stepanyan',
    userName: 'levonml',
    password: 'abcdefg',
  },
]
const oneUser = {
  name: 'testName',
  surname: 'testSurname',
  userName: 'testUserName',
  password: 'testPassword',
}
const usersFromDatabase = async () => {
  const users = await User.find({})
  return users
}
const helper = { usersFromDatabase, initialUsers, oneUser }
export default helper
