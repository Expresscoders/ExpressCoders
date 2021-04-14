const SurveyModel = require("../models/Survery.model");
const SurveyResponseModel = require("../models/SurveyResponse.model");

exports.getUserSurvey = async (req, res, next) => {
   const surveysList = await SurveyModel.find();
   res.send({
       "data": surveysList
   });
}

exports.getSurvey = async (req, res, next) => {
    const survey = await SurveyModel.findById(req.params._id);
    res.send({
        "data": survey
    });
 }

 exports.getPersonalCreatedSurveys = async (req, res, next) => {
     const survey = await SurveyModel.find({
         UserId: req.user._id
     }).catch(error => {
        res.status(500).send({
            "status": "FAILURE",
            "message": "Failure listing survey!",
            "data": null
        });
    }).then(async (data) => {

        let i = 0;

        for ( let s of data ) {
            // Finding Responses count
            const surveyResponses = await SurveyResponseModel.find({
                SurveyId: s._id,
            }).count();

            data[i] = data[i].toJSON();
            data[i]["responses"] = surveyResponses;
            console.log(data)

            i++;
        }
        console.log("Added")

        res.status(201).send({
            "data": data
        });
    });
 }

exports.createSurvey = async (req, res, next) => {
    console.log("Create survey.");

    let questionsReq = [];

    req.body.questions.forEach((question) => {
        questionsReq.push({
            Title: question.title,
            IsMultiChoice: question.is_multiple_choice,
            IsAgreeDisagree: question.is_agree_disagree,
            IsShortAnswer: question.is_short_answer,
            Choices: question.multi_choices,
            NumericOrder: question.id
        });
    });

    let sm = new SurveyModel({
        Questions: questionsReq,
        UserId: req.user._id,
        SurveyTitle: req.body.title,
        SurveyExpiryDays: req.body.expiryDays
    });

    await sm.save().catch(error => {
        res.status(500).send({
            "status": "FAILURE",
            "message": "Failure saving survey!",
            "data": null
        });
    }).then(data => {
        res.status(201).send({
            "status": "SUCCESS",
            "message": "Saved!",
            "data": null
        });
    });

}

exports.saveAttendedSurvey = async (req, res, next) => {

    let answers = [];
    let i = 1;
    for ( let ans of req.body.answers ) {
        answers.push({
            IsMultiChoice: ans.is_multi_choice,
            IsAgreeDisagree: ans.is_agree_disagree,
            IsShortAnswer: ans.is_short_answer,
            Choices: ans.answers,
            NumericOrder: i
        })
        i++;
    }

    let sm = new SurveyResponseModel({
        SurveyId: req.params._id,
        Email: req.body.email,
        FullName: req.body.full_name,
        Answers: answers,
    });

    await sm.save().catch(error => {
        res.status(500).send({
            "status": "FAILURE",
            "message": "Failure saving survey!",
            "data": null
        });
    }).then(data => {
        res.status(201).send({
            "status": "SUCCESS",
            "message": "Saved!",
            "data": null
        });
    });
}

exports.deletePersonalSurvey = async (req, res, next) => {
    await SurveyModel.deleteOne({
        UserId: req.user._id,
        _id: req.params._id
    }).catch(error => {
       res.status(500).send({
           "status": "FAILURE",
           "message": "Failure deleting survey!",
           "data": null
       });
   }).then(data => {
      res.send({
          "status": "SUCCESS",
          "message": "Delete success",
          "data": null
      })
   });
}