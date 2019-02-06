'use strict';
var Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: このコメント行より下の項目に注目してください。
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.  
//Make sure to enclose your value in quotes, like this: var APP_ID = "amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1";
var APP_ID = 'amzn1.ask.skill.d9a42f47-e9ba-4d07-94ca-bc18cc13e7f5';

var SKILL_NAME = "サンタの豆知識";
var GET_FACT_MESSAGE = "知ってましたか？";
var HELP_MESSAGE = "サンタの豆知識を聞きたい時は「サンタの豆知識」と、終わりたい時は「おしまい」と言ってください。どうしますか？";
var HELP_REPROMPT = "どうしますか？";
var STOP_MESSAGE = "さようなら";

//=========================================================================================================================================
//「TODO: ここから下のデータを自分用にカスタマイズしてください。」
//=========================================================================================================================================
var data = [
    "サンタクロースは、トルコ生まれの、聖ニコラウスがモデルといわれています。彼は４世紀ごろに司教であった人物であり、日ごろから、貧しい人を助け歩いた慈悲深い人物です。",
    "サンタクロースが、赤色の服を着ているのは、コカ・コーラ社の広告によるものだといわれています。それ以前は、青い服や、様々な色の服を着ていました。",
    "毎年７月には世界サンタクロース会議が開催されています。",
    "サンタクロースは8頭のトナカイをつれており、彼、彼女らの名前はダッシャー、ダンサー、プランサー、ヴィクセン、コメット、キューピッド、ドナー、ブリッツェンです。",
    "赤鼻のトナカイのルドルフは、アメリカの会社員であるロバート・メイが、娘のために作成された、クリスマスのキャラクターです。",
    "サンタクロースは現在、フィンランドのラップランドにある耳山で、トナカイ達と一緒にすんでいるようです",
    "サンタクロースはキリスト教徒ですが、キリストとは会ったことがないようです"
]
//=========================================================================================================================================
//この行から下のコードに変更を加えると、スキルが動作しなくなるかもしれません。わかる人のみ変更を加えてください。  
//=========================================================================================================================================
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewFactIntent');
    },
    'GetNewFactIntent': function () {
        var factArr = data;
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];
        var speechOutput = GET_FACT_MESSAGE + randomFact;
        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomFact)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = HELP_MESSAGE;
        var reprompt = HELP_REPROMPT;
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', STOP_MESSAGE);
    },
    
    // 予期せぬ終了
    'SessionEndedRequest': function() {
        this.emit(':tell', STOP_MESSAGE);
    }
};
