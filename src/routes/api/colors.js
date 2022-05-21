const router = require('express').Router();
let Color = require('../../models/color.model');

router.get('/', (req, res) => {
  Color.find()
    .then(colors => res.json(colors))
    .catch(err => res.status(500).json(`Error : ${err}`));
});

router.get('/:id', (req, res) => {
  Color.find({ catID: req.params.catID })
    .then(color => res.json(color))
    .catch(() => res.status(500).json('no color with this id'));
});

router.post('/add', (req, res) => {
  const {
    catID,
    color,
  } = req.body;

  if(!color) {
    return res.status(400).json({ msg: 'Please enter a color' });
  }

  const newColor = new Color({
    catID,
    color,
  });

  newColor.save()
    .then(() => res.json('new color added'))
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) => {
  Color.findById(req.params.id)
    .then(
      color => color.remove().then(
        () => res.json({ success: true })
      )
    )
    .catch(() => res.status(500).json({ success: false }));
});

router.put('/:id', (req, res) => {
  Color.findById(req.params.id)
    .then(color => {
      color.catID = req.body.catID;
      color.color = req.body.color;

      color.save()
        .then(() => res.json('color updated'))
        .catch(err => res.status(400).json(`Error: ${err}`));
    });
});

module.exports = router;
