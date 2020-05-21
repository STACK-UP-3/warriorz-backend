import '@babel/plugin-transform-regenerator';
import '@babel/polyfill';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import Util from '../helpers/util';

const util = new Util();

export default class social{
    static async Oauth(req, res) {
        let Action;
        let status;
        let userGot;
        let google = null;
        let facebook = null;
        const column = `${req.user.provider}`;
    
        if (column === 'google') {
          google = req.user.id;
        } else {
          facebook = req.user.id;
        }
    
        const googleSearch = await userService.findByProp({
          googleId: req.user.id,
        });
    
        const facebookSearch = await userService.findByProp({
          facebookId: req.user.id,
        });
    
        const exist = await userService.findByProp({
          email: req.user.emails[0].value,
        });
    
        if (googleSearch[0] || facebookSearch[0]) {
          if (!googleSearch[0]) {
            userGot = facebookSearch[0].dataValues;
          } else {
            userGot = googleSearch[0].dataValues;
          }
          Action = 'Log In';
          status = 200;
        } else if (exist[0]) {
          userGot = exist[0].dataValues;
          Action = 'Redirected by Email';
          status = 301;
        } else {
          const newUser = {
            firstname: req.user.name.familyName,
            lastname: req.user.name.givenName,
            email: req.user.emails[0].value,
            isVerified: req.user.emails[0].verified,
            image: req.user.photos[0].value,
            googleId: google,
            facebookId: facebook,
          };
          const inserter = await userService.createuser(newUser);
          userGot = inserter.dataValues;
          Action = 'SignUp';
          status = 201;
        }
    
        const token = jwt.sign(
          {
            id: userGot.id,
            email: userGot.email,
          },
          process.env.JWT_KEY,
          {
            expiresIn: '4h',
          },
        );
    
        const message = `Dear ${userGot.firstname} ${userGot.lastname} Welcome, ${Action} succesful `;
        const data = {
          id: userGot.id,
          email: userGot.email,
          TokenKey: token,
        };
        util.setSuccess(status, message, data);
        return res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
    }
}  