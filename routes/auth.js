const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login', 
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email!')
            .normalizeEmail()
            .custom((value, { req }) => {
                return User.findOne({ email: value }).then(user => {
                    if (!user) {
                        return Promise.reject(
                            'Email does not exists. Please signup for an account'
                        );
                    }
                });
            }),
        body(
            'password',
            'Please enter a valid password with only numbers and text with more than 5 characters'    
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim()
    ],
    authController.postLogin
);

router.post(
    '/signup', 
    [
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email!')
            .normalizeEmail()
            .custom((value, { req }) => {
                // if (value === 'test@gmail.com') {
                //     throw new Error('This email is forbidden');
                // }
                // return true;

                // Async Validation
                // Asynchronous because we have to reach out to the DB
                // and wait for the result
                return User.findOne({ email: value }).then(userDoc => {
                    if (userDoc) {
                        return Promise.reject(
                            'Email exists already, please pick a different one'
                        );
                    }
                });
            }),
        body(
            'password',
            'Please enter a valid password with only numbers and text with more than 5 characters'    
        )
            .isLength({ min: 5 })
            .isAlphanumeric()
            .trim(),
        body('confirmPassword')
            .trim()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password has to match!');
                }
                return true;
            })
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;