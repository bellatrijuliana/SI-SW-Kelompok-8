const Prisma = require('prisma/prisma-client');
/** Instantiate Prisma client */
const prisma = new Prisma.PrismaClient();
const userSchema = require('prisma/prisma-client');
const routes = require('./routes')

const Joi = require('joi')
const joiMiddleware = require('express-joi-validation').createValidator({})
/** Required Node.js modules */
const Express = require('Express');
/** Initialize Express */
/** Supplier validation schema for Joi */
const supplierSchema = Joi.object({
    Id: Joi.number().greater(0),
    name: Joi.string().alphanum().min(1).max(191).required(),
    contact: Joi.string().alphanum().min(1).max(191).required(),
    email: Joi.string().email().max(191).required(),
    incoming_funds: Joi.string().email().max(191).required(),
    cash_out: Joi.string().email().max(191).required(),
    description: Joi.string().alphanum().min(1).max(191).required(),
  });
/** Required Node.js modules */
const app = Express();
app.use(Express.json());
const port = 3000;
/** Routes */
app.get('/', (req, res) => {
res.send("Hello, API server!");
});

/** Create a new supplier and write it to MySQL */
app.post("/user/create", joiMiddleware.query(userSchema), async (req, res) => {
    try {
      /** Use Prisma to write the data to our MySQL database */
      res.body = await prisma.user.create({
        data: {
          name: req.body.name,
          contact: req.body.contact,
          email: req.body.email,
        }
      });
    /** Send a response telling the user our data has been written */
  res.status(200).send({"message": "OK"});
}
/** If Prisma fails to write to the MySQL database */
/** Catch the error and send it as our response */
catch (err) {
  res.status(500).send(err);
}
});

/** Get a user by name, return the object in our response */
app.get('/user', async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          name: req.body.name,
        }
      });
      /** Send the User object as our response */
      res.status(200).send({"object": user});
    }
    /** When Prisma fails to read from database, catch the error and send it as our response */
    catch (err) {
      res.status(500).send(err);
    }
  });

  /** Update an existing supplier */
app.patch("/user/update", joiMiddleware.query(userSchema), async (req, res) => {
    try {
      /** Use Prisma to write the data to our MySQL database */
      await prisma.user.update({
        where: {
          id: req.body.id,
        },
        data: {
          name: req.body.name,
          contact: req.body.contact,
          email: req.body.email,
          incoming_funds: req.body.incoming_funds,
          cash_out: req_body.cash_out,
          description:req.body.description,
       }
     });
     /** Send a response telling the user our data has been written */
     res.status(200).send({"message": "OK"});
    }
  /** When Prisma fails to write to database, catch the error and send it as response */
    catch (err) {
      res.status(500).send(err);
    }
  })

  /** Delete a user with a given name */
app.delete('/user/delete', joiMiddleware.query(userSchema), async (req, res) => {
    try {
      const user = await prisma.user.delete({
        where: {
          name: req.body.name,
        }
      });
      res.status(200).send({"message": "deleted OK"});
    }
    /** If Prisma fails to delete the object, catch the error and send it as response */
    catch (err) {
      res.status(500).send(err);
    }
  });

/** Server */
app.listen(port, () => {
    console.log(`API listening on localhost: ${port}`);
});