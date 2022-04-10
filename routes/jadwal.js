const express = require('express');
const knex = require('../config/knex.js')
const jadwalRouter = express.Router()
const response = require('../config/payload')

jadwalRouter.route('/list').get(async (req, res) => {
    await knex.select('j.id_jadwal', 'm.id_mapel', 'm.nama_mapel', 'm.metode', 'j.start_date', 'j.end_date')
    .from('jadwal AS j')
    .leftJoin('mata_pelajaran AS m', 'j.id_mapel', 'm.id_mapel')
    .where('j.view',true)
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))         
        });
});

jadwalRouter.route('/create').post(async (req, res) => {
    await knex('jadwal').insert({id_mapel: req.body.id_mapel, start_date: req.body.start_date, end_date: req.body.end_date})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))         
        }); 
});

jadwalRouter.route('/update/:id').put(async (req, res) => {
    await knex('jadwal').where('id_jadwal',req.params.id).update({id_mapel:req.body.id_mapel, start_date:req.body.start_date, end_date: req.body.end_date})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))
        })
});

jadwalRouter.route('/remove/:id').delete(async (req, res) => {
    await knex('jadwal').where('id_jadwal',req.params.id).update({view:false})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))
        })
});

jadwalRouter.route('/restore/:id').put(async (req, res) => {
    await knex('jadwal').where('id_jadwal',req.params.id).update({view:true})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))
        })
});

module.exports = jadwalRouter;