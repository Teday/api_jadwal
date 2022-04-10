const express = require('express');
const knex = require('../config/knex')
const response = require('../config/payload')
const mapelRouter = express.Router()

mapelRouter.route('/list').get(async (req, res) => {
    await knex.select().where('view',true).from('mata_pelajaran')
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))         
        });
});

mapelRouter.route('/create').post(async (req, res) => {
    await knex('mata_pelajaran').insert({nama_mapel: req.body.nama_mapel, metode: req.body.metode})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))         
        }); 
});

mapelRouter.route('/update/:id').put(async (req, res) => {
    await knex('mata_pelajaran').where('id_mapel',req.params.id).update({nama_mapel:req.body.nama_mapel})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))
        })
});

mapelRouter.route('/remove/:id').delete(async (req, res) => {
    await knex('mata_pelajaran').where('id_mapel',req.params.id).update({view:false})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))
        })
});

mapelRouter.route('/restore/:id').put(async (req, res) => {
    await knex('mata_pelajaran').where('id_mapel',req.params.id).update({view:true})
        .then( result => {
            return response.payload(result, res)
        })
        .catch( err => {
            return response.payload(err, res.status(405))
        })
});

module.exports = mapelRouter;