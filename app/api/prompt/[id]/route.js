import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

// GET - read a prompt specific
export const GET = async (req, { params }) => {
  try {
    await connectToDatabase();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Unable to fetch the prompt", { status: 500 });
  }
};

// PATCH - update a prompt specific
export const PATCH = async (req, { params, body }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDatabase();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Unable to update the prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDatabase();

    const existingPrompt = await Prompt.findByIdAndRemove(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Unable to delete the prompt", { status: 500 });
  }
};
