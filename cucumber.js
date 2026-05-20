//cucumber.js 

module.exports = {
  default: {
    require: ['features/steps/**/*.js', 'features/hooks/**/*.js'],

    paths: ['features/**/*.feature'],
    timeout: 100 * 1000,
    publishQuiet: true,
    format: [
            '@cucumber/pretty-formatter',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json'
    ],
  }
}