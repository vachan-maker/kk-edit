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
        if(req.body.body == null || req.body.body == "")
        {
            return res.status(400).json({
                error: "Body is required!"
            })
        }
        if(songNumber < 1 || songNumber > 504) {
            return res.status(400).json({
                error: "Song number must be between 1 and 504"
            })
        }
        const response = await fetch('https://api.github.com/repos/vachan-maker/kristheeya-keerthanangal-data-repo/issues', {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github+json",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "X-GitHub-Api-Version": "2022-11-28"
            },
            body:
                JSON.stringify({
                    title: `Song Correction Request for ${songNumber}`,
                    body: req.body.body,
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
        res.status(500).json({error:"Server Error"})

    }
})

app.listen(PORT,()=> console.log(`Listening on PORT ${PORT}`));