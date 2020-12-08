const UserDAO = require('../dao/UserDAO')
const handleControllerError = require('../utils/handleControllerError')
const firebase = require('firebase');

exports.create = async (req, res, next) => {
    try {
        
        let credential = ''

        if(req.body.provider=='facebook'){
            credential = firebase.auth.FacebookAuthProvider.credential(req.body.accessToken);
        }else if(req.body.provider=='google'){
            credential = firebase.auth.GoogleAuthProvider.credential(null, req.body.accessToken);
        }

        const firebaseRes = await firebase.auth().signInWithCredential(credential)

        const firebaseUser = await UserDAO.readbyUid(firebaseRes.user.uid)

        if(firebaseUser){
            const { id } = firebaseUser
        
            return res.status(201).send({
                id
            })
        }else{
            const userObj = {
                name: firebaseRes.user.displayName,
                firebaseUid: firebaseRes.user.uid,
                profileImage: firebaseRes.user.photoURL,
                provider: credential.providerId
            }

            const { id } = await UserDAO.create(userObj)
            
            return res.status(201).send({
                id
            })
        }

    } catch (err) {
        handleControllerError(err, next)
    }
}