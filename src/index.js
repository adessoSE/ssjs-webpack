import amp from 'lib/ampScript'

const msg = amp.run(`
VAR @response
SET @response = "Hello World!"
`);
Write(msg);
