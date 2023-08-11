const { Router }= require('express');
const router = Router();
const { check } = require('express-validator')
const {sendEmail, recieveEmail, getCoffees} = require('../controllers/controller')

router.get('/', (req, res) => {
    res.status(200).send({
        ok : true
    })
});

router.post('/send-email',[
    check('email', 'not valid email').isEmail()
], sendEmail);

router.post('/recieve-email',[ //Checking if the routes are valid using express-validator.
    
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Not valid email').isEmail(),
    check('msg', 'Message is required').not().isEmpty(),

], recieveEmail);

router.get('/get-data', getCoffees);

module.exports = router;