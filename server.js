const express = require('express');
const app = express();

// Define a route for GET requests
app.get('/', (req, res) => {
    res.send('Boost BNB!');
});


// Start the server
const PORT = 8080; // Port to match NGINX proxy
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
