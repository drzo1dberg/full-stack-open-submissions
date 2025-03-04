const mongoose = require('mongoose')
const logger = require('./utils/logger.js')
if (process.argv.length<3) {
  logger.info('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://wuhansoldier:${password}@geldwelt.ojdqkeh.mongodb.net/noteApp?retryWrites=true&w=majority&appName=geldwelt`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({}).then(result => {
  result.forEach(note => {
    logger.info(note)
  })
  mongoose.connection.close()
})

/* 
const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
 */