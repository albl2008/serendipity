const { Router } = require('express')

const  router = Router();
const LogEntry = require('../models/logEntry');


router.get('/', async (req,res,next)=>{
    try {
        const entries = await LogEntry.find();
        res.json(entries);    
    } catch (error) {
        next(error)
    }
    
})

router.post('/',async (req,res,next)=>{
    try {
        const newEntry = new LogEntry(req.body);
        const createdEntry = await newEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422);
          }
          next(error);
    }
})

router.put('/:id', async(req,res,next)=>{
    try {
        const newData = req.body
        const id = req.params.id
        const travelLog = await LogEntry.findByIdAndUpdate(id,newData);
        const updated = travelLog

        res.json(updated);


    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req,res,next)=>{
    try {
        const id = req.params.id
        const deleted = await LogEntry.findByIdAndDelete(id)
        res.json(deleted)
    } catch (error) {
        
    }
})

module.exports = router;