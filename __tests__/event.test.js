require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Event = require('../lib/models/Event');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates an event', () => {
    return request(app)
      .post('/api/v1/events')
      .send({
        recipeId: 'cookies',
        dateOfEvent: '2015-03-25',
        notes: 'add more butter',
        rating: 5
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: 'cookies',
          dateOfEvent: '2015-03-25',
          notes: 'add more butter',
          rating: 5,
          __v: 0
        });
      });
  });

  it('gets all recipes', async() => {
    await Event.create([
      { recipeId: 'cookies', dateOfEvent: '08-30-1991', notes: 'add more butter', rating: 5 },
      { recipeId: 'brownies', dateOfEvent: '05-30-2019', notes: 'add more choclate', rating: 5  },
      { recipeId: 'cake', dateOfEvent: '08-30-2027', notes: 'add more sugar', rating: 5  }
    ]);

    return request(app)
      .get('/api/v1/events')
      .then(res => {
        res.body.forEach(event => {
          expect(res.body).toContainEqual({
            _id: event._id.toString(),
            recipeId: event.recipeId,
            dateOfEvent: event.dateOfEvent,
            notes: event.notes,
            rating: event.rating
          });
        });
      });
  });

  it('gets a recipe by id', async() => {
    const event = await Event.create({
      recipeId: 'cookies', dateOfEvent: '08-30-1991', notes: 'add more butter', rating: 5 
    });
    return request(app)
      .get(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: event._id.toString(),
          recipeId: event.recipeId,
          dateOfEvent: event.dateOfEvent,
          notes: event.notes,
          rating: event.rating,
          __v: 0
        });
      });
  });

  it('updates a event by id', async() => {
    const event = await Event.create({
      recipeId: 'cookies', dateOfEvent: '08-30-1991', notes: 'add more butter', rating: 5 
    });

    return request(app)
      .patch(`/api/v1/events/${event._id}`)
      .send({ name: 'good cookies' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          recipeId: event.recipeId,
          dateOfEvent: event.dateOfEvent,
          notes: event.notes,
          rating: event.rating,
          __v: 0
        });
      });
  });
  it('deletes a recipe by id', async() => {
    const event = await Event.create({
      recipeId: 'cookies', dateOfEvent: '08-30-1991', notes: 'add more butter', rating: 5 
    });

    return request(app)
      .delete(`/api/v1/events/${event._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: event._id.toString(),
          recipeId: event.recipeId,
          dateOfEvent: event.dateOfEvent,
          notes: event.notes,
          rating: event.rating,
          __v: 0
        });
      });
  });

});
