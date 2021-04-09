const mongoose = require("mongoose");
const secure = require("../middleware/secure");
const Survey = mongoose.model("Survey");
const SurveyAnswer = mongoose.model("SurveyAnswer");

exports.create = [
    secure,
    async (req, res, next) => {
        req.body["authorId"] = req.user._id;
        return await new Survey(req.body).save()
            .then(
                survey => res.status(201).json(survey),
                err => res.status(400).json(err)
            ).catch(next);
    }
];

exports.index = async (req, res, next) => {
    const now = Date.now()
    return await Survey.find({
        $and: [
            { expiryDate: { $gt: now } },
            { publishDate: { $lt: now } }
        ]
    })
        .then(surveys => res.status(200).json(surveys))
        .catch(next);
};

exports.participate = async (req, res, next) => {
    return await Survey.findOne({ _id: req.params.id })
        .then(survey => {
            if (survey) {
                const now = Date.now();
                if (survey.expiryDate >= now && survey.publishDate <= now) {
                    req.body["surveyId"] = survey._id;
                    return new SurveyAnswer(req.body).save()
                        .then(
                            answer => res.status(201).json(answer),
                            err => res.status(400).json(err)
                        );
                } else {
                    const msg = survey.expiryDate < now ?
                        "This survey has expired" : 
                        "This survey has not yet been published";
                    return res.status(400).json({ error: msg });
                }
            } else {
                return res.status(404).json(null);
            }
        }).catch(next);
}

exports.userSurveys = [
    secure,
    async (req, res, next) => {
        return await Survey.find({ authorId: req.user._id })
            .then(surveys => res.status(200).json(surveys))
            .catch(next);
    }
];

exports.find = [
    secure,
    async (req, res, next) => {
        return await Survey.findOne({ _id: req.params.id })
            .then(survey => {
                if (survey && survey.authorId.equals(req.user._id)) {
                    return SurveyAnswer.find({ surveyId: survey._id })
                        .then(answers => res.status(200).json({
                            survey: survey,
                            answers: answers
                        }))
                } else if (survey) {
                    return res.status(403).json(null)
                } else {
                    return res.status(404).json(null)
                }
            }).catch(next)
    }
];