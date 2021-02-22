# Express mongo jwt passport boilerplate

## Project setup

1. Install NodeJS (above the 10.17 version is recommended, edit .nvmrc and package.json if yoy want to use different version)
   https://nodejs.org/en/download/package-manager/
   or via NVM

1. Install Mongo.

1. Copy .env.example to .env and configure your local environment, including database config. Eg. `cp .env.example .env`

1. Open terminal in a current directory and run commands

   ```bash
   npm install -g yarn
   yarn install
   ```

1. Run `yarn dev` for regular node engine run or `yarn start` for **nodemon** usage.

## Notes

Please, configure **Prettier and ESLint** to keep proper fomatting. We extend `"airbnb"` and have custom rules, listed in `.eslintrc`