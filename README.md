# Share Private Github Repository By Link

This is a full-stack Node.js/Vue.js implementation of an mini-app that let's you share a private Github repo using a hidden endpoint with a secret parameter, i.e., `/#/private-repos/:owner/:repo/:secret`.

It is similar in purpose to sharing an unlisted Youtube video or sharing a Google Drive file by link.

Related blog post at: [https://levkarma.com/web-development/blog/share-private-github-by-link](https://levkarma.com/web-development/blog/share-private-github-by-link).

## Usage

Create the `.env` file from `.env.example`. Create your Github personal access token using [this guide](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

Run `cp storage/data.test.json storage/data.json` and modify the fields in `storage/data.json` to match your app.

Run `npm run build` to build the site from Vue. This will build the `dist` directory.

Run `node run.js` to run Express.js server, which serves both API and static Vue.js files.

You can test on `localhost` or deploy to a server. It would be good to use some security features like rate-limiting on the server.

Direct users to `/#/private-repos/:owner/:repo/:secret` to let them add themselves onto your private repo. Note the secret is the secret you set in `storage/data.json`.

## Testing

Run `npm test`.

## Notes
