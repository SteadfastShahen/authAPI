import { genSalt, hash } from 'bcrypt';
import { MessageClient } from 'cloudmailin';
import { User } from '../models/User'
const registerUserService = async (password: string, confirmPass: string, email: string, name: string) => {
    const emailCheck = await User.findOne({ email })

    if(password == confirmPass && !emailCheck){
        
        const salt = await genSalt(10);

        
        const hashedPassword = await hash(password, salt)
        try {
            const currentUser = await User.create({
                name,
                email,
                password: hashedPassword
            })
            const client = new MessageClient({ username: "6126dea731b2f948", apiKey: "Rpy9U9RTm9D4WGbQCPvueBoT"})
            await client.sendMessage({
                "from": "Registrar <registrar@info.com>",
                "to": currentUser.email,
                "test_mode": false,
                "subject": "Hello from Test App!",
                "plain": "You registered successfully",
                "html": "<h1>Welcome!</h1>"
              });

            // res.send('Successfully registered')
        } catch(err){
            // res.status(400).send(err)
        }
    }
    else{
        if(emailCheck){
            // throw new HttpError('', '')
        }
        else {
            // res.status(400).send('Passwords do not match')
        }
    }
}


export {
    registerUserService
}