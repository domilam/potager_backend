

exports.postLogin = (req, res, next) => {
    const email = req.body.emailLogin;
    const password = req.body.pwdLogin;
    let userValid = false;
    let pwdValid = false;
    console.log(req.body);
    listUser = [
        {   id_user: 1,
            email: 'pierre@qualia.fr',
            pwd: 'azerty1234'
        },
        {
            id_user: 2,
            email: 'paul@qualia.fr',
            pwd: 'azerty1234'
        },
        {
            id_user: 3,
            email: 'jacque@qualia.fr',
            pwd: 'azerty1234'
        }
    ]
    let i = 0;

    //search user
    while (!userValid && i<listUser.length){
        if (listUser[i].email == email){
            userValid = true;
        }
        i += 1;
    }

    if (userValid){
        //compare password
        if (listUser[i-1].pwd == password){
            pwdValid = true;

            //authentication is valid
            req.session.isAuthenticated = true;
            req.session.user = {
                id_user: listUser[i-1].id_user,
                email: email
            };
            return req.session.save((result) => {
                res.status(201).json({message: 'Session enregistrée !!', data: email});
            });
        }else{
            res.status(422).json({message: 'Invalid password'});
        }
    }else{
        return res.status(422).json({message: 'Invalid user'});
    }
};
