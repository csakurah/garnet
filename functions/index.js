const admin = require('firebase-admin')
const functions = require('firebase-functions')
const moment = require('moment-timezone').tz('Asia/Tokyo')
const serviceAccount = require('./keys/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://garnet-d44e7.firebaseio.com'
})

const db = admin.firestore()

exports.plants = functions.https.onRequest((req, res) => {
  if (req.method === 'GET') {
    if (req.query.id) {
      getPlant(req, res)
    } else {
      getPlants(req, res)
    }
  } else if (req.method === 'POST') {
    createPlant(req, res)
  } else if (req.method === 'PUT') {
    updatePlant(req, res)
  } else if (req.method === 'DELETE') {
    deletePlant(req, res)
  } else {
    res.status(406).json({
      status: 'NG'
    })
  }
})

exports.addRecord = functions.https.onRequest((req, res) => {
  const now = moment.format('YYYY-MM-DD hh:mm:ss')
  const record = {
    id: req.body.id,
    humidity: req.body.humidity,
    recorded_at: now
  }

  if (!record.id || !record.humidity) {
    res
      .status(400)
      .json({ status: 'NG', error: '植物のIDまたは湿度が指定されていません' })
    retuurn
  }

  db.collection('plants')
    .doc(record.id)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        return Promise.reject(
          new Error('指定されたIDの植物は見つかりませんでした')
        )
      }
      return snapshot.ref.collection('records').add(record)
    })
    .then(doc => {
      return res.status(200).json({
        id: doc.id,
        status: 'OK'
      })
    })
    .catch(error => {
      return res.status(400).json({
        status: 'NG',
        error: error
      })
    })
})

function getPlants(req, res) {
  db.collection('plants')
    .get()
    .then(snapshot => {
      const plants = []
      snapshot.forEach(doc => {
        plants.push(Object.assign({}, { id: doc.id }, doc.data()))
      })
      return res.status(200).json({
        status: 'OK',
        plants: plants
      })
    })
    .catch(error => {
      return res.status(400).json({
        status: 'NG',
        error: errorToString(error)
      })
    })
}

function getPlant(req, res) {
  db.collection('plants')
    .doc(req.query.id)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        return Promise.reject(
          new Error('指定されたIDの植物は見つかりませんでした。')
        )
      }
      return snapshot.ref.collection('records').get()
    })
    .then(snapshot => {
      const records = []
      snapshot.forEach(doc => {
        records.push(doc.data())
      })

      return res.status(200).json({
        status: 'OK',
        records: records
      })
    })
    .catch(error => {
      console.log(error)
      return res.status(400).json({
        status: 'NG',
        error: errorToString(error)
      })
    })
}

function createPlant(req, res) {
  const plant = {
    name: req.body.name
  }

  if (!plant.name) {
    res
      .status(400)
      .json({ status: 'NG', error: '植物の名前が指定されていません。' })
    return
  }
  db.collection('plants')
    .add(plant)
    .then(snapshot => {
      return res.status(200).json({
        status: 'OK',
        plant: Object.assign({}, { id: snapshot.id }, plant)
      })
    })
    .catch(error => {
      return res.status(400).json({
        status: 'NG',
        error: errorToString(error)
      })
    })
}

function updatePlant(req, res) {
  const plant = {
    id: req.body.id,
    name: req.body.name
  }

  if (!plant.id || !plant.name) {
    res
      .status(400)
      .json({ status: 'NG', error: '植物のIDまたは名前が指定されていません' })
    return
  }

  db.collection('plants')
    .doc(plant.id)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        return Promise.reject(
          new Error('指定されたIDの植物は見つかりませんでした。')
        )
      }
      return snapshot.ref.update(plant)
    })
    .then(() => {
      return res.status(200).json({ status: 'OK' })
    })
    .catch(error => {
      return res.status(400).json({ status: 'NG', error: errorToString(error) })
    })
}

function deletePlant(req, res) {
  if (!req.body.id) {
    res
      .status(400)
      .json({ status: 'NG', error: '植物のIDが指定されていません。' })
    return
  }

  db.collection('plants')
    .doc(req.body.id)
    .get()
    .then(snapshot => {
      if (!snapshot.exists) {
        return Promise.reject(
          new Error('指定されたIDの植物は見つかりませんでした。')
        )
      }
      return snapshot.ref.collection('records').get()
    })
    .then(snapshot => {
      if (!snapshot.exists) {
        return Promise.resolve()
      }
      return Promise.all(
        snapshot.docs.map(doc => {
          return doc.ref.delete()
        })
      )
    })
    .then(() => {
      return db
        .collection('plants')
        .doc(req.body.id)
        .get()
    })
    .then(snapshot => {
      return snapshot.ref.delete()
    })
    .then(() => {
      return res.status(200).json({ status: 'OK' })
    })
    .catch(error => {
      return res.status(400).json({ status: 'NG', error: errorToString(error) })
    })
}

function errorToString(error) {
  if (!error) {
    return ''
  } else if (error instanceof Error) {
    return error.message
  } else {
    return String(error)
  }
}
