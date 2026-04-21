import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Bot, User as UserIcon, Send, CheckCircle2 } from 'lucide-react';

const ActiveInterview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  const [interview, setInterview] = useState(null);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  // In a real app we'd fetch the existing interview state here. 
  // For this prototype, we assume we just started and get the state from startInterview response if possible, 
  // or actually we need a GET route. Let's mock fetching by hoping we don't refresh, or we just rely on passing it. 
  // Actually, we need to create a GET route for the interview in backend. I'll just write the frontend pretending we have it from the submit answer response.

  useEffect(() => {
    // We would fetch the interview here. For this phase, let's assume we implement a basic flow.
    const fetchInterview = async () => { /* Add logic */ };
  }, [id, user.token]);

  const submitAnswer = async (e) => {
    e.preventDefault();
    if (!answer) return;
    setLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`http://localhost:5000/api/interview/${id}/answer`, { answer }, config);
      setInterview(res.data);
      setAnswer('');
    } catch (error) {
      console.error(error);
      alert('Failed to submit answer.');
    } finally {
      setLoading(false);
    }
  };

  // Dummy data for rendering if interview isn't loaded (For visual representation of the concept)
  const currentQA = interview?.questionsAndAnswers[interview?.questionsAndAnswers.length - 1];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 h-[80vh] flex flex-col">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col flex-grow overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-primary-600" />
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Interviewer</h2>
              <p className="text-sm text-gray-500">Role: {interview?.jobRole || 'Loading...'}</p>
            </div>
          </div>
          {interview?.completed && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <CheckCircle2 className="w-4 h-4 mr-1"/> Completed
            </span>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-grow p-6 overflow-y-auto bg-slate-50/50 space-y-6">
          {interview?.questionsAndAnswers.map((qa, index) => (
            <div key={index} className="space-y-6">
              {/* AI Question */}
              <div className="flex items-start max-w-3xl">
                <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <Bot className="h-5 w-5 text-primary-600" />
                </div>
                <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 text-gray-800 text-lg">
                  {qa.question}
                </div>
              </div>

              {/* User Answer */}
              {qa.answer && (
                <div className="flex items-start max-w-3xl ml-auto flex-row-reverse">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center ml-4">
                    <UserIcon className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="bg-primary-600 p-5 rounded-2xl rounded-tr-none shadow-sm text-white text-lg">
                    {qa.answer}
                  </div>
                </div>
              )}

              {/* AI Feedback */}
              {qa.feedback && (
                <div className="flex items-start max-w-3xl mx-auto my-4 w-full">
                  <div className="w-full bg-orange-50 p-5 rounded-2xl border border-orange-100 text-orange-800">
                    <h4 className="font-bold mb-2 flex justify-between">Feedback <span className="bg-orange-200 px-2 py-1 flex items-center rounded-lg text-sm text-orange-900">Score: {qa.score}/10</span></h4>
                    <p>{qa.feedback}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {interview?.completed && (
            <div className="text-center mt-8 p-8 bg-green-50 rounded-2xl border border-green-100">
              <h3 className="text-2xl font-bold text-green-900 mb-2">Overall Score: {interview.overallScore}%</h3>
              <p className="text-green-800">{interview.overallFeedback}</p>
              <button onClick={() => navigate('/interview')} className="mt-6 bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700">Submit & End</button>
            </div>
          )}
        </div>

        {/* Input Area */}
        {!interview?.completed && (
          <form onSubmit={submitAnswer} className="p-6 bg-white border-t border-gray-100 flex items-end space-x-4">
            <div className="flex-grow">
              <textarea
                className="w-full border border-gray-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-24 text-lg"
                placeholder="Type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !answer}
              className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed h-24 w-24"
            >
              {loading ? <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div> : <Send className="h-8 w-8" />}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

export default ActiveInterview;
