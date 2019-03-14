const express = require('express');
const app = express();

app.get('/', (req: any, res: any) => {
    res.send('');
});

app.listen(8080, () => {
    console.info("App is listening on port 8080");
});
