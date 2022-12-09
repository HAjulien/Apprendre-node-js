import mongoose from "mongoose"
import validator from "validator"
import bcrypt  from "bcrypt"

const SALT_ROUNDS = 10 

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
        lowercase : true,

        validate(v) {
            if (!validator.isEmail(v)) throw new Error ('Email non valide!')
        }
    },
    password : {
        type : String,
        required : true,
        
        validate(v){
            if(!validator.isLength(v, { min : 4, max : 20 })) throw new Error('Le mot de passe doit être entre 4 et 20 caractères!')
        }

    }
})

userSchema.statics.findUser = async (email, password) => {

    const user = User.findOne({ email })
    if(!user) throw new Error ("Erreur, pas possible de se connecter!")

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid) throw new Error("Erreur, impossible de se connecter!")

    return user
}

userSchema.pre('save', async function(){
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password, SALT_ROUNDS)

})

export const User = mongoose.model('User', userSchema)