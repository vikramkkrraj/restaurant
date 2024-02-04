export const testUserController = async(req,res) => {
    try {
        res.status(200).send({
            sucess: true,
            msg : 'test user data Api'
        })
    } catch (error) {
        console.log('error', error)
    }
}

// module.exports = {testUserController}