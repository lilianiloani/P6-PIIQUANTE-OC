
const sauce = require('../models/SauceModel');

/* exports.create = (req, res, next) => {
  const sauce = new sauce({
    ...req.body.sauce
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({ error }));
}; */

exports.create = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.thing);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new sauce({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });

  sauce.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.list = (req, res, next) => {
  sauce.find()
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};

exports.getOne = (req, res, next) => {
  sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

exports.update = (req, res, next) => {
    sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.delete = (req, res, next) => {
    sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'sauce supprimé !'}))
      .catch(error => res.status(400).json({ error }));
};






