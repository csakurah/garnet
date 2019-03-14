const admin = require('firebase-admin')
const functions = require('firebase-functions')
const moment = require('moment-timezone').tz('Asia/Tokyo')
const serviceAccount = require('./keys/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://garnet-d44e7.firebaseio.com'
})

const db = admin.firestore()

exports.addRecord = functions.https.onRequest((req, res) => {
  // for dev
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')

  const now = moment.format('YYYY-MM-DD hh:mm:ss')
  const record = {
    id: req.body.id,
    humidity: req.body.humidity,
    recorded_at: now
  }

  if (!record.id || !record.humidity) {
    res.json({ status: 'NG', error: '植物のIDまたは湿度が指定されていません' })
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
      return res.json({
        id: doc.id,
        status: 'OK'
      })
    })
    .catch(error => {
      return res.json({
        status: 'NG',
        error: error
      })
    })
})

exports.getPlants = functions.https.onRequest((req, res) => {
  // for dev
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')

  db.collection('plants')
    .get()
    .then(snapshots => {
      const getRecordPromises = []
      snapshots.forEach(snapshot => {
        getRecordPromises.push(getPlantRecords(snapshot))
      })

      return Promise.all(getRecordPromises)
    })
    .then(plants => {
      return res.json({
        status: 'OK',
        plants: plants
      })
    })
    .catch(error => {
      return res.json({
        status: 'NG',
        error: errorToString(error)
      })
    })
})

function getPlantRecords(snapshot) {
  return new Promise((resolve, reject) => {
    const plant = snapshot.data()
    plant.id = snapshot.id

    snapshot.ref
      .collection('records')
      .get()
      .then(snapshots => {
        const records = []
        snapshots.forEach(snapshot => {
          const record = snapshot.data()
          record.id = snapshot.id
          records.push(record)
        })

        plant.records = records
        resolve(plant)
        return
      })
      .catch(error => {
        reject(error)
      })
  })
}

exports.createPlant = functions.https.onRequest((req, res) => {
  // for dev
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')

  const plant = {
    name: req.body.name
  }

  if (!plant.name) {
    res.json({ status: 'NG', error: '植物の名前が指定されていません。' })
    return
  }
  db.collection('plants')
    .add(plant)
    .then(snapshot => {
      return res.json({
        status: 'OK',
        plant: Object.assign({}, { id: snapshot.id }, plant)
      })
    })
    .catch(error => {
      return res.json({
        status: 'NG',
        error: errorToString(error)
      })
    })
})

exports.updatePlant = functions.https.onRequest((req, res) => {
  // for dev
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')

  const plant = {
    id: req.body.id,
    name: req.body.name
  }

  if (!plant.id || !plant.name) {
    res.json({ status: 'NG', error: '植物のIDまたは名前が指定されていません' })
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
      return res.json({ status: 'OK' })
    })
    .catch(error => {
      return res.json({ status: 'NG', error: errorToString(error) })
    })
})

exports.deletePlant = functions.https.onRequest((req, res) => {
  // for dev
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST')

  if (!req.body.id) {
    res.json({ status: 'NG', error: '植物のIDが指定されていません。' })
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
      return res.json({ status: 'OK' })
    })
    .catch(error => {
      return res.json({ status: 'NG', error: errorToString(error) })
    })
})

function errorToString(error) {
  if (!error) {
    return ''
  } else if (error instanceof Error) {
    return error.message
  } else {
    return String(error)
  }
}
