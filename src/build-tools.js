/**
 * @copyright Matthew Bill
 */

const program = require('commander');
const { BaseConsole } = require('mdb-cli-framework');
const { LoggerFactory } = require('mdb-logging');
const { EnvironmentNames } = require('mdb-core');

const UpdateSonarCommand = require('./commands/update-sonar-command.js');

/**
 * Class representing {insert description}.
 */
class BuildTools extends BaseConsole {
  constructor() {
    super();
    const self = this;
    const loggerFactory = new LoggerFactory();
    self.logger = loggerFactory.getLogger(EnvironmentNames.PRODUCTION, false);
  }

  start() {
    const self = this;
    program
      .command('sonar-update <dir>')
      .description('Updates the SonarQube properties file with build specific details.')
      .option('-v, --version <value>', 'The version of the component being analysed.')
      .option('-b, --branch <value>', 'The branch to be analysed.')
      .option('-t, --target <value>', 'The target branch that the analysed branch will be merged into.')
      .action((dir, options) => {
        const { version, branch, target } = options;
        const updateSonarCommand = new UpdateSonarCommand({
          filePath: dir,
          version,
          branch,
          target,
          logger: self.logger,
        });
        updateSonarCommand.execute().then(() => {
          self.logger.info('finished updating sonar properties');
        });
      });

    program.parse(process.argv);
  }
}

module.exports = BuildTools;
