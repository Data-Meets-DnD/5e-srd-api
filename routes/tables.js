let express = require('express'),
    router = express.Router();

var ClassTable = require('../models/classtable');

// Register class routes
router.use('/barbarian', require('./class-table-routes/barbarian'));
router.use('/bard', require('./class-table-routes/bard'));
router.use('/cleric', require('./class-table-routes/cleric'));
router.use('/druid', require('./class-table-routes/druid'));


// -------------------------------------
router
.get('/', (req,res) => {
    ClassTable.find((err,tables) => {
      if (err) {
        res.send(err);
      }
    }).sort( { index: 'asc'} ).exec( (err, tables) => {
      if (err) {
        res.send(err);
      }
      res.status(200).json(tables);
    })
})

// -------------------------------------
router
.get('/:index', (req,res) => {
  ClassTable.findOne( { index: parseInt(req.params.index) }, (err,table) => {
    if (err) {
      res.send(err);
    }
    res.status(200).json(table);
  })
})

module.exports = router;