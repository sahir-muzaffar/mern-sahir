import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length > 200;
        let decodedData;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id
            

        }
        else {

            
            req.userId = token;
            
        }
        next();

    } catch (error) {
        console.log(error);
    }

}
export default auth;