const express = require('express')
const router = express.Router()
const connect =require('../connections/db')
const config = require('../configs/configs');
const  jwt = require('jsonwebtoken');

const app = express();

//registrarse
app.set('llave', config.llave);

router.post('/', async (req, res) => {
    try {
        const db=await connect()      
        console.log(db) 
        const _db=db.db("DB_FIX_IT")
        
        

        const collection = _db.collection("Usuarios");
        collection.insert({
            "user": req.body.user,
            "password" : req.body.password,
            "correo" : req.body.correo,
            "telefono" : req.body.telefono

        },
        function(err, result) {
           
            if(err) {
                console.log(err)
                db.close();
                return res.status(500).json(err);               
            }else{
            db.close();

            const payload = {
                check:  true
               };
               const token = jwt.sign(payload, app.get('llave'), {
                expiresIn: 3000
               });

               return res.status(200).json({
                   mensaje: 'Autenticación correcta',
                   token: token
                  })
               
            }
        
        } ) 
    
    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})


router.get('/:usuario', async (req, res) => {
    try {
        const db=await connect()    
        const _db=db.db("DB_FIX_IT")

        const usuario_=req.params.usuario
        const collection = _db.collection("Usuarios");
        const query = { user : usuario_ };

        collection.find(query).toArray(function(err, result) {
            if (err) throw err;

            db.close();
            if (result.length==0){
                return res.status(404).json("Not found")
            }else{
                return res.status(200).json(result[0])
            }
            
          });     
          
    } catch (error) {
        console.log(error)
        db.close();
        return res.status(500).json(error);

    }

})


module.exports = router