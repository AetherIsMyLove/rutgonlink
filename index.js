const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const helmet = require('helmet');
app.use(helmet());
const db = require('./db'); 
db.run();
app.set('trust proxy', 1);
const { rateLimit } = require('express-rate-limit');
// cors middleware
const cors = require('cors');
app.use(cors({
  origin: 'https://aetherismylove.github.io/rutgonlink_FE/',
  methods: ['GET', 'POST'],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  limit: 100,             
  standardHeaders: 'draft-8', 
  legacyHeaders: false,       
});


app.use(limiter);
const linkModel = require('./db/model/link');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
    const newLink = new linkModel({ url: originalUrl });
    newLink.save().then(() => {
        res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${newLink._id}` });
    }).catch(err => {
        res.status(500).json({ error: 'Internal Server Error' });
    });

});
app.get('/:id', async (req, res) => {

  try {
      const link = await linkModel.findById(req.params.id);
        if (link) {
            link.clicks += 1;
            await link.save();
            res.redirect(link.url);
        } else {
            res.status(404).json({ error: 'Link not found' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
