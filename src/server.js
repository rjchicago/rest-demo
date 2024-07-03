require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const service = require('./apples');
const swaggerDocs = require('./swagger');

const app = express();
const jsonParser = bodyParser.json()

swaggerDocs(app);

app.use(cors());

const {internal_port, external_port, path_prefix} = require('config');

app.get('/health', (req, res) => res.send('Ok'));

/**
 * @openapi
 * components:
 *   schemas:
 *     Apple:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         colors:
 *           type: array
 *           items:
 *             type: string
 *         flavors:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @openapi
 * /apples:
 *   get:
 *     summary: Get all apples
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apple'
 */
app.get('/apples', (req, res) => {
  const apples = service.getApples()
  res.send(magicFilter(apples, req.query));
});

/**
 * @openapi
 * /apples/{name}:
 *   get:
 *     summary: Get an apple by name
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the apple
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Apple'
 */
app.get('/apples/:name', (req, res) => {
  try {
    res.send(service.getApple(req.params.name));
  } catch (e) {
    res.status(404).send({error: e.message});
  }
});

/**
 * @openapi
 * /apples:
 *   post:
 *     summary: Create a new apple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               flavors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Successful response
 */
app.post('/apples', jsonParser, (req, res) => {
  try {
    res.send(service.postApple(req.body));
  } catch (e) {
    res.status(400).send({error: e.message});
  }
});

/**
 * @openapi
 * /apples/{name}:
 *   put:
 *     summary: Update an existing apple
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the apple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               flavors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
app.put('/apples/:name', jsonParser, (req, res) => {
  if (req.body.name !== req.params.name) {
    res.status(400).send({error: `Cannot change name using PUT`});
    throw new Error(`Cannot change name using PUT.`);
  }
  try {
    res.send(service.putApple(req.params.name, req.body));
  } catch (e) {
    res.status(404).send({error: e.message});
  }
});

/**
 * @openapi
 * /apples/{name}:
 *   patch:
 *     summary: Partially update an existing apple
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the apple
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               flavors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response
 */
app.patch('/apples/:name', jsonParser, (req, res) => {
  try {
    res.send(service.patchApple(req.params.name, req.body));
  } catch (e) {
    res.status(400).send({error: e.message});
  }
});

/** 
 * @openapi
 * /apples/{name}:
 *   delete:
 *     summary: Delete an apple
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the apple
 *     responses:
 *       200:
 *         description: Successful response
 */
app.delete('/apples/:name', (req, res) => {
  try {
    res.send(service.deleteApple(req.params.name));
  } catch (e) {
    res.status(400).send({error: e.message});
  }
});

/**
 * @openapi
 * /apples/{name}:
 *   head:
 *     summary: Check if an apple exists
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the apple
 *     responses:
 *       200:
 *         description: Successful response
 */
app.head('/apples/:name', (req, res) => {
  try {
    res.send(service.getApple(req.params.name));
  } catch (e) {
    res.status(404).send({error: e.message});
  }
})

/**
 * @openapi
 * /:
 *   options:
 *     summary: Options
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 *         headers:
 *           access-control-allow-headers:
 *             schema:
 *               type: string
 *             description: Allowed headers
 *           access-control-allow-methods:
 *             schema:
 *               type: string
 *             description: Allowed methods
 *           access-control-allow-origin:
 *             schema:
 *               type: string
 *             description: Allowed origin
 */
app.options('*', cors())

/**
 * @openapi
 * /:
 *   trace:
 *     summary: Trace
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.trace('*', (req, res) => {
  res.send(`TRACE: ${req.originalUrl}`);
});

/**
 * @openapi
 * /:
 *   connect:
 *     summary: Connect
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 */
app.connect('*', (req, res) => {
  res.send(`CONNECT: ${req.originalUrl}`);
});

/**
 * @openapi
 * /:
 *   link:
 *     summary: Link
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 */
app.link('*', (req, res) => {
  res.send(`LINK: ${req.originalUrl}`);
})

/**
 * @openapi
 * /:
 *   unlink:
 *     summary: Unlink
 *     parameters: []
 *     responses:
 *       200:
 *         description: Successful response
 */
app.unlink('*', (req, res) => {
  res.send(`UNLINK: ${req.originalUrl}`);
})

const magicFilter = (objs, filter) => {
  try {
    const ignoreKeys = ['sort'];
    let filtered = [...objs];
    Object.keys(filter).filter(key=>!ignoreKeys.includes(key)).forEach(key => {
      const paths = key.split('.');
      if (filter[key].startsWith('~')) {
        const regex = new RegExp(filter[key].substring(1), 'gi');
        filtered = filtered.filter(o => {
          let p = o;
          paths.forEach(path => p = p[path] ? p[path] : p);
          return regex.test(String(p));
        });
      } else {
        filtered = filtered.filter(o => {
          let p = o;
          paths.forEach(path => p = p[path] ? p[path] : p);
          return String(p) === filter[key];
        });
      }
    });
    const sort = (list, sort) => {
      const dir = sort.startsWith("-") ? -1 : 1;
      if (sort.startsWith("-")) sort = sort.substring(1);
      return list.sort((a, b) => a[sort] < b[sort] ? -dir : dir);
    }
    return filter.sort ? sort(filtered, filter.sort) : filtered;
  }
  catch (e) {
    console.error(e.message);
    return [{
      error: 'An error occurred while filtering.',
      filter
    }]
  }
};

app.listen(internal_port, () => console.log(`http://localhost:${external_port}/docs`));