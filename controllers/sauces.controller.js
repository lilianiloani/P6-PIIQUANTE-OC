
const Sauces = require('../models/SauceModel');

const fs = require('fs');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauces({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
  .then(() => { res.status(201).json({message: 'sauce enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.listSauce = (req, res, next) => {
  Sauces.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ? {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
  Sauces.findOne({_id: req.params.id})
      .then((sauce) => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({ message : 'Not authorized'});
          } else {
              Sauces.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'sauce modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
    .catch((error) => {
          res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Not authorized'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauces.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'sauce supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.likesOrDislikes = (req, res, next) => {
    let userIdentifiant = req.body.userId
    let likeStatus = req.body.like 

    if(likeStatus == 1) {
        Sauces.updateOne({ _id:req.params.id },
            {
                $inc:{likes:1 }, 
                $push:{usersLiked:userIdentifiant}
            }) 
            .then(() => { res.status(200).json({message:'like has been increased'})})
            .catch(error => { res.status(400).json({ error })});
    } else
    if (likeStatus == 0) {
		Sauces.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(userIdentifiant)) {
                    Sauces.updateOne({ _id: req.params.id },
                        {
                            $inc: { likes: -1 },
                            $pull: { usersLiked: userIdentifiant }, 
                        })
                        .then(() => res.status(200).json({ message: "like has been cancelled " }))
                    } else {
                        Sauces.updateOne({ _id: req.params.id },
                            {
                                $inc: { dislikes: -1 },
                                $pull: { usersDisliked: userIdentifiant },
                            })
                            .then(() => res.status(200).json({ message: "Dislike has been cancelled" }))
                    }
                })
                .catch(error => res.status(400).json({ error })); 
    }else
        if (likeStatus == -1) {
            Sauces.updateOne({ _id:req.params.id },
                {   
                    $inc:{dislikes:1}, 
                    $push:{usersDisliked:userIdentifiant}
                }) 
                .then(() => { res.status(200).json({message:'Dislike has been increased'})})
                .catch(error => { res.status(400).json({ error })})
        }
};
 

    


 















  