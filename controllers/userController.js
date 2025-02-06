const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// signup a user
const signupUser = async (req, res) => {
    const {email, password} = req.body
  
    try {
      const user = await User.signup(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({email, token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
  

// ... existing login and signup functions ...

const requestPasswordReset = async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    await user.generatePasswordReset()
    await user.save()

    // Send password reset email
    let transporter = nodemailer.createTransport({
      // Configure your email service here
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    let mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${user.resetPasswordToken}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: 'A reset email has been sent to ' + user.email + '.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    })

    if (!user) {
      return res.status(400).json({ error: 'Password reset token is invalid or has expired.' })
    }

    // Set the new password
    user.password = await bcrypt.hash(newPassword, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined

    await user.save()

    res.status(200).json({ message: 'Your password has been updated.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser, requestPasswordReset, resetPassword }
