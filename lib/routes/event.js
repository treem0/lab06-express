const { Router } = require('express');
const Event = require('../models/Event');

module.exports = Router()

  .post('/', (req, res) => {
    Event
      .create(req.body)
      .then(events => res.send(events));
  })

  .get('/', (req, res) => {
    Event
      .find()
      .select({ name: true })
      .then(events => res.send(events));
  })

  .get('/:id', (req, res) => {
    Event
      .findById(req.params.id)
      .then(events => res.send(events));
  })

  .patch('/:id', (req, res) => {
    Event
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(events => res.send(events));
  })

  .delete('/:id', (req, res) => {
    Event
      .findByIdAndDelete(req.params.id)
      .then(events => res.send(events));
  });

