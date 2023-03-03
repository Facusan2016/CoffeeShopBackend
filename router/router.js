const { Router }= require('express');
const router = Router();
const { check } = require('express-validator')
const {sendEmail, recieveEmail} = require('../controllers/controller')

router.get('/', (req, res) => {
    res.status(200).send({
        ok : true
    })
});

router.post('send-email',[
    check('email', 'not valid email').isEmail()
], sendEmail);

router.post('recieve-email',[
    
    check('name', 'Name is required.').not().isEmpty(),
    check('email', 'Not valid email').isEmail(),
    check('msg', 'Message is required').not().isEmpty(),

], recieveEmail);

module.exports = router;