import * as express from 'express';
import db from '../../../db';
import { Event } from '../../../serverTypes';
const router = express.Router();

const getAllEvents = async (req, res) => {
  try {
    const events: Array<Event> = await db.models.Event.findAll();
    res.status(200).send(events);
  } catch (e) {
    res.status(500).send(e);
  }
};

const createEvent = async (req, res) => {
  try {
    const data: Event = req.body;
    if (!data.user_id) {
      res.status(401).send('user_id is required');
    }
    if (!data.start_time) {
      res.status(401).send('start_time is required');
    }
    if (!data.end_time) {
      res.status(401).send('end_time is required');
    }
    const event: Event = await db.models.Event.create(data);
    res.status(200).send(event);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateEvent = async (req, res) => {
  try {
    const data: Event = req.body;
    const id: number = req.params.id;
    const event: Event = await db.models.Event.update(data, {
      where: {
        id,
      },
    });
    res.status(200).send(event);
  } catch (e) {
    res.status(500).send(e);
  }
};

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').put(updateEvent);

export default router;
