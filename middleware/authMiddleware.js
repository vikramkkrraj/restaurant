import jwt from 'jsonwebtoken';


export const validateCredentials = async(req,res, next) => {
    try {
        
        const token = req.header("X-Auth-Token");
        if(!token) {
            return res.status(403).send({
                success : false,
                message : "Access denied, Please Provide token",
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log('decoded...', decoded);

        req.body.id = decoded.id;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            Message : "Invalid Token",
            error
        })
    }
}