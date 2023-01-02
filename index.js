import got from 'got'
const core = require("@actions/core");
const github = require("@actions/github");

async function main() {
  try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput("who-to-greet");
    console.log(`Hello ${nameToGreet}!`);
    
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);

    let id_token = await core.getIDToken('https://cold-heron-19.deno.dev')
    console.log('id_token', id_token)
    core.setOutput('id_token', id_token)

    await got.get('https://cold-heron-19.deno.dev', {
      headers: {
        'Authorization': 'Bearer ' + id_token
      }
    })

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  } 
}

main()