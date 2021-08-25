const S = require('fluent-json-schema')

const signUpBodySchema = S.object()
  .title('User Signup')
  .prop('userName', S.string().required())
  .prop('name', S.string().required())
  .prop('password', S.string().required())

const loginBodySchema = S.object()
  .title('User Login')
  .prop('userName', S.string().required())
  .prop('password', S.string().required())

exports.loginSchema = {
  tags: ['User'],
  summary: 'User login',
  body: loginBodySchema
}

exports.signupSchema = {
  tags: ['User'],
  summary: 'User signup',
  body: signUpBodySchema
}

exports.getProfileSchema = {
  tags: ['User'],
  summary: 'User Profile Details'
}
