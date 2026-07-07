const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running");
})

app.post('/song/:number', async (req, res) => {
    var songNumber = req.params.number;
    try {
        const response = await fetch('https://api.github.com/repos/vachan-maker/kristheeya-keerthanangal-data-repo/issues', {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2026-03-10"
            },
            body:
                JSON.stringify({
                    title: `Song Correction Request for ${songNumber}`,
                    body: req.body.description,
                    labels: ["data"],
                    assignees: ["vachan-maker"]
                })

        })
        const data = await response.json()

        if(!response.ok) {
            return res.status(response.status).json(data);
        }
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"Internal Server Errror"})

    }
})

app.listen(PORT,()=> console.log(`Listening on PORT ${PORT}`));