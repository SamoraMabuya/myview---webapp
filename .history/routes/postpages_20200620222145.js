import { Router } from 'express';
import { register, login } from '../sqlcontrol/users';
import { authenticate } from 'passport';
const router = Router();


router.post("/register", function (req, res) {
    register
})
router.post("/login", (req, res) => {
    login
})
// router.post("/login", usercontrol.login);
// router.post('/register', usercontrol.register);


// router.post("/register", (req, res, next) => {
// });

  

router.post("/login", (req, res) => {authenticate
    'local', {
        successRedirect: '/profile',
        failureRedirect: '/login'
    };
})

// router.post("/login", usercontrol.login)
export default router
