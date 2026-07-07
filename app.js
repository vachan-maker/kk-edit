const express = require("express");

const app = express();

app.get('/',(req,res)=>{
    res.send("API is running");
})

app.post('/song/:number',async(req,res) => {
    var songNumber = req.params.number;
    try{
    const response = await fetch('https://api.github.com/vachan-maker/kristheeya-keerthanangal-data-repo',{
        method: "POST",
        headers: {
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer <YOUR-TOKEN>",
            "X-GitHub-Api-Version": "2026-03-10"
        }
    })
    } catch(error) {

    }
})