
import jwt_decode from "jwt-decode"

 const createorgetuser = async (response)=>{

    /*const decoded: {
        name: string,
        picture: string,
        sub: string

    }= jwt_decode(response.credential);
    const {name,picture,sub} = decoded;
    const obj = {name,picture,sub};

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture
    }
    console.log(decoded);
    console.log("sahir");
    console.log(name);
    const names = name;
   
}

; */
const userObject = jwt_decode(response.credential);

const { name, sub, picture } = userObject;
const user = {
    _id: sub,
    _type: 'user',
    userName: name,
    image: picture
}

console.log("sahir");
console.log(userObject);

 }
 export {createorgetuser}
