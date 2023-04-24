import passport from "passport";
import { User } from "../models/userDetails";

passport.use((User as any).createStrategy());
passport.serializeUser((User as any).serializeUser());
passport.deserializeUser((User as any).deserializeUser());

export const passportConfig = [
    passport.initialize(),
    passport.session(),
];