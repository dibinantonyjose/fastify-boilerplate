const S = require('fluent-json-schema')

const loginBodySchema = S.object()
  .title('User Login')
  .prop('userName', S.string().required())
  .prop('password', S.string().required())

exports.loginSchema = {
  tags: ['User'],
  summary: 'User login',
  body: loginBodySchema
}

exports.getProfileSchema = {
  tags: ['User'],
  summary: 'User Profile Details'
}
