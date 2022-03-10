export default{
    forgotPassMessage: {
        name: 'Info App',
        fromEmail: 'shahen@steadfast.tech',
        subject: 'Reset password',
        text: `Reset link: http://localhost:3000/auth/reset/`,
        html1: `<h1>Reset link:</h1> <a>http://localhost:3000/auth/reset/`,
        html2: '</a>'
    },
    registerUserMessage: {
        fromName: 'Info App',
        fromEmail: 'shahen@steadfast.tech',
        subject: 'Confirmation token',
        text: `Welcome! Confirmation token: `,
        html1: `<h1>Welcome!</h1> <h4><em>Confirmation token: `,
        html2: '</em></h4>'
    }
}