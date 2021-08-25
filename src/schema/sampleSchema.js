const S = require('fluent-json-schema')

const sampleBodySchema = S.object()
  .title('Add Sample Data')
  .prop('name', S.string().required())
  .prop('age', S.number().required())

const getSampleDetailSchema = S.object()
  .title('Get Sample Data')
  .prop('id', S.string().pattern('^[a-fA-F0-9]{24}$').required())

exports.addDataSampleSchema = {
  tags: ['Sample'],
  summary: 'Add sample data',
  body: sampleBodySchema
}

exports.listUserSampleDataSchema = {
  tags: ['Sample'],
  summary: 'List sample data of a specific user'
}

exports.listAllSampleDataSchema = {
  tags: ['Public'],
  summary: 'List all sample data'
}

exports.detailOfSampleData = {
  tags: ['Public'],
  summary: 'Details of a sample data',
  params: getSampleDetailSchema
}
