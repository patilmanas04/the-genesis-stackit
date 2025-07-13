import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/userProvider";
import { formatDistanceToNow } from "date-fns";

export default function QuestionDetail() {
  const { id } = useParams();
  const context = useContext(userContext);

  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!context || !id) return;

    if (context.questions.length === 0) {
      // Questions not loaded yet → fetch
      context.getAllQuestions().then((data) => {
        const found = data.find((q: any) => q.id === id);
        setQuestion(found);
        setLoading(false);
      });
    } else {
      // Questions already in context
      const found = context.questions.find((q) => q.id === id);
      setQuestion(found);
      setLoading(false);
    }
  }, [context, id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!question)
    return <div className="text-center mt-10">Question not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Question Header */}
      <div className="space-y-2 border-b pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {question.title}
        </h1>
        <div className="text-sm text-gray-500 flex flex-wrap items-center gap-2">
          <span>
            Asked {formatDistanceToNow(new Date(question.createdAt))} ago
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="text-blue-600 font-medium">
            {question.author.name}
          </span>
        </div>
      </div>

      {/* Question Description */}
      <div className="mt-6 text-gray-800 text-base leading-relaxed">
        {question.description}
      </div>

      {/* Tags */}
      <div className="mt-4 flex flex-wrap gap-2">
        {question.tags.map((tag: string) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Answers Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Answers ({question.answers})
        </h2>

        {question.answerList && question.answerList.length > 0 ? (
          question.answerList.map((ans: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm"
            >
              <p className="text-gray-900 text-base">{ans.content}</p>

              <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span>
                    Answered by{" "}
                    <span className="text-blue-600 font-medium">
                      {ans.user.name}
                    </span>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {formatDistanceToNow(new Date(ans.createdAt))} ago
                  </span>
                </div>
                <div className="text-xs text-gray-500 flex gap-3">
                  <span>👍 {ans.upvotes}</span>
                  <span>👎 {ans.downvotes}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-400">No answers yet</div>
        )}
      </div>
    </div>
  );
}
