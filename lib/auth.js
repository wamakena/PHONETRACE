import jwt from "jsonwebtoken"

export function createToken(user){

return jwt.sign(
{ id:user.id, role:user.role },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
)

}

export function verifyToken(token){

try{

return jwt.verify(token,process.env.JWT_SECRET)

}catch{

return null

}

}
