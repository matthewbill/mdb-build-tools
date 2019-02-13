/* eslint-disable consistent-return */
const fs = require('fs');

class UpdateSonarCommand {
  constructor(options) {
    const self = this;
    self.filePath = options.filePath;
    self.version = options.version;
    self.branch = options.branch;
    self.target = options.target;
    self.logger = options.logger;
  }

  execute() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.logger.info('updating sonar properties');
      const encoding = 'utf8';

      fs.readFile(self.filePath, encoding, (err, data) => {
        if (err) {
          self.logger.error(`Error reading file: ${err}`);
          reject(err);
        }

        let result = data.replace('VERSION', self.version);
        result = result.replace('BRANCH', self.branch);
        if (self.target) {
          result = result.replace('TARGET', `sonar.branch.target=${self.target}`);
        } else {
          result = result.replace('TARGET', '');
        }

        fs.writeFile(self.filePath, result, encoding, (writeError) => {
          if (writeError) {
            self.logger.error(`Error writing file: ${writeError}`);
            reject(writeError);
          }
          resolve();
        });
      });
    });
  }
}

module.exports = UpdateSonarCommand;
