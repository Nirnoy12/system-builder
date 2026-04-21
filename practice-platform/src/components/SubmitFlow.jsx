import React, { useMemo } from 'react';
import { getQuestionsForNodes } from '../constants';

export function SubmitFlow({ isVisible, nodes }) {
  const questions = useMemo(() => getQuestionsForNodes(nodes), [nodes]);

  if (!isVisible) return null;

  return (
    <div className="reflection-footer">
      <div className="reflection-header">
        <div className="reflection-title">Reflection Questions</div>
        <div className="reflection-meta">Answer each question before submitting. Your canvas is still auto-saving.</div>
      </div>
      <div className="reflection-questions">
        {questions.map((q, i) => (
          <div key={i} className="question-card">
            <div className="question-num">Question {i + 1}</div>
            <div className="question-text">{q}</div>
            <textarea 
              className="form-textarea" 
              placeholder="Write your answer here..."
              style={{ minHeight: '100px', backgroundColor: 'white' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
