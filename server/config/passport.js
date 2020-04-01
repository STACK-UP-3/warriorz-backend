import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import facebookStrategy from 'passport-facebook';
import dotenv from 'dotenv'
import profiler from '../helpers/profiler'
import userService from '../services/userService';

dotenv.config()

passport.serializeUser((user,done)=>{
    done(null,user)
    })
  
passport.deserializeUser(async(user,done)=>{
    let foundUser;
        const byGoogle = await userService.findByProp({
            googleId : user.id,
        });
        const byFacebook = await userService.findByProp({
            facebookId : user.id,
        });

        if(byGoogle[0]){
            foundUser = byGoogle;
        }else{
            foundUser = byFacebook;
        }
        done(null,foundUser)
    })

passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "/api/v1/users/auth/facebook/redirect",
    profileFields: ['name', 'email','photos'],
    },profiler))

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_ID,
    clientSecret : process.env.GOOGLE_SECRET,
    callbackURL:'/api/v1/users/auth/google/redirect',
    }, profiler))
  
export default passport
