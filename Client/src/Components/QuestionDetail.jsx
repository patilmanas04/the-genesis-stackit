import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const dummyAnswers = [
  {
    id: 1,
    user: "Sarah Chen",
    content: "Great question! Here's a comprehensive approach to JWT...",
    time: "answered 2h ago",
  },
  {
    id: 2,
    user: "Mike Rodriguez",
    content: "Here are some additional security considerations...",
    time: "answered 1h ago",
  }
];

const QuestionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <Wrapper>
      <BackBtn onClick={() => navigate(-1)}>← Back</BackBtn>

      <QuestionBox>
        <h2>How to implement JWT authentication in React with TypeScript?</h2>
        <p>I'm building a React app with TypeScript and need to implement JWT authentication with refresh tokens...</p>
        <Meta>
          <span>Asked 2h ago</span>
          <span>248 views</span>
        </Meta>
      </QuestionBox>

      <Answers>
        <h3>Answers</h3>
        {dummyAnswers.map((a) => (
          <Answer key={a.id}>
            <p>{a.content}</p>
            <AnswerFooter>
              <span>{a.time}</span>
              <b>{a.user}</b>
            </AnswerFooter>
          </Answer>
        ))}
      </Answers>
    </Wrapper>
  );
};

export default QuestionDetail;

// Styled Components
const Wrapper = styled.div`
  padding: 40px 20px;
`;

const BackBtn = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #14b884;
  cursor: pointer;
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  background: #fff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.04);
  margin-bottom: 30px;

  h2 {
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    color: #444;
  }
`;

const Meta = styled.div`
  margin-top: 10px;
  font-size: 13px;
  color: #888;
  display: flex;
  justify-content: space-between;
`;

const Answers = styled.div`
  h3 {
    margin-bottom: 16px;
  }
`;

const Answer = styled.div`
  background: #f8f8f8;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
`;

const AnswerFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  margin-top: 12px;
`;
