import { GoogleGenerativeAI } from '@google/generative-ai';
import Interview from '../models/Interview.js';

// @desc    Start a new mock interview
// @route   POST /api/interview/start
// @access  Private
export const startInterview = async (req, res) => {
  try {
    const { jobRole } = req.body;
    
    // Check if API key is provided
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "Gemini API key is missing. Please set GEMINI_API_KEY in .env" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert technical interviewer. I am a candidate applying for the role of ${jobRole}. 
    Please ask me my very first interview question. It should be a technical or behavioral question relevant to this role.
    Only output the question, nothing else.`;
    
    const result = await model.generateContent(prompt);
    const firstQuestion = result.response.text();

    const interview = new Interview({
      user: req.user._id,
      jobRole,
      questionsAndAnswers: [{ question: firstQuestion.trim() }]
    });

    const savedInterview = await interview.save();
    res.status(201).json(savedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit an answer and get next question or feedback
// @route   POST /api/interview/:id/answer
// @access  Private
export const submitAnswer = async (req, res) => {
  try {
    const { answer } = req.body;
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }

    // Get the last question asked
    const lastQA = interview.questionsAndAnswers[interview.questionsAndAnswers.length - 1];
    lastQA.answer = answer;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const evaluatePrompt = `You are interviewing a candidate for the role of ${interview.jobRole}. 
    You previously asked: "${lastQA.question}".
    The candidate replied: "${answer}".
    Evaluate this answer. Provide a short constructive feedback paragraph, and a score out of 10.
    Format your response EXACTLY as the following JSON structure:
    {
      "feedback": "your feedback here",
      "score": 8
    }`;

    // Note: in a real robust setup, we'd use responseSchema or JSON mode. Here we try to parse it.
    const evalResult = await model.generateContent(evaluatePrompt);
    let evalText = evalResult.response.text().trim();
    // Strip markdown code blocks if present
    if(evalText.startsWith("\`\`\`json")) evalText = evalText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "");
    
    let evaluationRes = { feedback: "Good attempt.", score: 5 };
    try {
        evaluationRes = JSON.parse(evalText);
    } catch(e) {
        console.error("Failed to parse evaluation JSON", evalText);
    }

    lastQA.feedback = evaluationRes.feedback;
    lastQA.score = evaluationRes.score;

    // Decide if we should continue (e.g., limit to 3 questions for this demo)
    if (interview.questionsAndAnswers.length >= 3) {
      interview.completed = true;
      // Calculate overall score
      const totalScore = interview.questionsAndAnswers.reduce((sum, qa) => sum + qa.score, 0);
      interview.overallScore = Math.round((totalScore / (interview.questionsAndAnswers.length * 10)) * 100);
      interview.overallFeedback = "Interview completed. You did a great job overall!";
    } else {
      // Ask next question
      const nextPrompt = `You are an expert technical interviewer interviewing a candidate for ${interview.jobRole}. 
      You have already asked ${interview.questionsAndAnswers.length} questions.
      Please ask the next unique, slightly harder technical question.
      Only output the question, nothing else.`;
      
      const nextResult = await model.generateContent(nextPrompt);
      const nextQuestion = nextResult.response.text();
      interview.questionsAndAnswers.push({ question: nextQuestion.trim() });
    }

    const updatedInterview = await interview.save();
    res.json(updatedInterview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
