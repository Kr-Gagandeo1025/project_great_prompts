import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { stringify } from "querystring";

//get posts
export const GET = async (req,{params}) => {
    try{
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate('creator');
        if(!prompts) return new Response("Prompt not found",{status:404});

        return new Response(JSON.stringify(prompts),{status:201})
    }catch(error){
        return new Response("Cannot get prompt",{status : 500});
    }
}

// patch (update)
export const PATCH = async (req,{params}) => {
    const{prompt, tag} = await req.json();
    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response("Prompt not Found",{status:404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200});
    }catch(error){
        return new Response("Failed to update prompt",{status:500});
    }
}

// Delete (delete the prompt)
export const DELETE = async (req, {params}) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt Deleted Successfully",{status:200});
    }catch(error){
        return new Response("Cannot Delete Prompt",{status:500});
    }
}