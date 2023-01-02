const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput("who-to-greet");
    console.log(`Hello ${nameToGreet}!`);
    
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    const aud = new URL(`/functions/${'some-function-id'}`, 'https://console.bls.dev');
    console.log('aud', aud.href)
    let id_token = await core.getIDToken(aud.href)
    console.log('id_token', id_token)
    core.setOutput('id_token', id_token)

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  } 
}

main()