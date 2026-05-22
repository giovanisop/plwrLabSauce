//cucumber.js 

module.exports = {
  default: {
    require: [
        'features/steps/**/*.js', 
        'features/hooks/**/*.js'
    ],

    //on paths put the sequence of features needed to run
    paths: [
      'features/Login.feature',
      'features/Purchase.feature'
    ],
    publishQuiet: true,
    format: [
            '@cucumber/pretty-formatter',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json'
    ],
  }
}