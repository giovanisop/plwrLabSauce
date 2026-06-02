//cucumber.js 

module.exports = {
  default: {
    require: [
        'features/steps/**/*.steps.js', 
        'features/hooks/**/*.js',
        'utils/*.js'
    ],

    //on paths put the sequence of features needed to run
    paths: [
      'features/Login.feature',
      'features/Purchase.feature',
      'features/Checkout.feature'
    ],
    publishQuiet: true,
    format: [
            '@cucumber/pretty-formatter',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json'
    ],
  }
}