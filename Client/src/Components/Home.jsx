import React from "react";
import styled from "styled-components";
import {
  FaArrowUp,
  FaArrowDown,
  FaCommentDots,
  FaEye,
  FaQuestionCircle,
  FaCheckCircle,
  FaUsers,
  FaStar,
  FaClock,
  FaChartLine,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const questions = [
  {
    id: "1",
    title: "How to implement JWT authentication in React with TypeScript?",
    body: "I'm building a React application with TypeScript and need to implement JWT authentication...",
    tags: ["react", "typescript", "jwt", "authentication"],
    user: "Alex Johnson",
    votes: 15,
    views: 248,
    answers: 3,
    asked: "2h ago",
  },
  {
    id: "2",
    title: "Best practices for React component optimization?",
    body: "What are the most effective ways to optimize React components for better performance?",
    tags: ["react", "performance", "optimization", "hooks"],
    user: "Sarah Chen",
    votes: 8,
    views: 156,
    answers: 2,
    asked: "5h ago",
  },
  {
    id: "3",
    title: "How to handle form validation with Zod and React Hook Form?",
    body: "I want to create a robust form validation system using Zod schema validation...",
    tags: ["react", "forms", "validation", "zod", "react-hook-form"],
    user: "Mike Rodriguez",
    votes: 12,
    views: 210,
    answers: 4,
    asked: "1d ago",
  },
];

const Home = () => {
    const navigate = useNavigate();
  const [expandedQuestion, setExpandedQuestion] = React.useState(null);

  return (
    <Wrapper>
      <Header>
        <h1>Discover Knowledge</h1>
        <p>
          Join a community of developers sharing knowledge and solving problems
          together
        </p>
      </Header>

      <Stats>
        <StatCard>
          <Icon>
            <FaQuestionCircle />
          </Icon>
          <div>
            <h2>2.5k+</h2>
            <p>Questions Asked</p>
          </div>
        </StatCard>
        <StatCard>
          <Icon>
            <FaCheckCircle />
          </Icon>
          <div>
            <h2>4.8k+</h2>
            <p>Answers Provided</p>
          </div>
        </StatCard>
        <StatCard>
          <Icon>
            <FaUsers />
          </Icon>
          <div>
            <h2>1.2k+</h2>
            <p>Active Members</p>
          </div>
        </StatCard>
      </Stats>

      <SectionHeader>
        <h3>Latest Questions</h3>
        <small>4 questions • Updated just now</small>
      </SectionHeader>

      <Filters>
        <Filter active>
          <FaStar /> All
        </Filter>
        <Filter>
          <FaClock /> Newest
        </Filter>
        <Filter>
          <FaChartLine /> Trending
        </Filter>
        <Filter>Unanswered</Filter>

        <Dropdown>
          <select>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </Dropdown>
      </Filters>

      <Questions>
        {questions.map((q, idx) => (
          <QuestionCard key={idx} onClick={() => navigate(`/questions/${q.id}`)}>

            <VoteBlock>
              <VoteBox>
                <FaArrowUp />
                <VoteCount>{q.votes}</VoteCount>
                <FaArrowDown />
              </VoteBox>
              <AnswerMeta>
                <AnswerTag>
                  <FaCheck />
                </AnswerTag>
                <AnswerCount>
                  <FaCommentDots /> {q.answers}
                </AnswerCount>
              </AnswerMeta>
              <Views>
                <FaEye /> {q.views}
              </Views>
            </VoteBlock>

            <Content>
              <Title>{q.title}</Title>
              <Body>{q.body}</Body>
              <Tags>
                {q.tags.map((tag, i) => (
                  <Tag key={i}>#{tag}</Tag>
                ))}
              </Tags>

              <Meta>
                <User>
                  <Avatar />
                  <span>{q.user}</span>
                </User>
                <small>{q.asked}</small>
              </Meta>
            </Content>
            {expandedQuestion === idx && (
              <ExpandedContent>
                <AnswerBox>
                  <p>
                    Great question! Here's a comprehensive approach to JWT
                    authentication in React with TypeScript:
                  </p>
                  <pre>
                    {`
#1. Token Storage
// For security, avoid localStorage for sensitive tokens...
// ...

#2. Auth Context with Refresh Logic
// code block...
        `}
                  </pre>
                </AnswerBox>

                <AuthorMeta>
                  <Avatar />
                  <div>
                    <strong>{q.user}</strong>
                    <p>1250 reputation • Auth Expert</p>
                  </div>
                </AuthorMeta>
              </ExpandedContent>
            )}
          </QuestionCard>
        ))}
      </Questions>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  padding: 32px 20px;
  font-family: "Segoe UI", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #111;
  }

  p {
    font-size: 1rem;
    color: #555;
    margin-top: 8px;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const StatCard = styled.div`
  background: #f9fafa;
  border-radius: 14px;
  padding: 20px 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  min-width: 200px;

  h2 {
    color: #14b884;
    font-size: 1.6rem;
    margin: 0;
  }

  p {
    color: #333;
    font-weight: 500;
    margin: 4px 0 0;
  }
`;

const Icon = styled.div`
  font-size: 24px;
  color: #14b884;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 20px 0 12px;
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
  align-items: center;
  background: #f8fafd;
  padding: 8px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
`;

const Filter = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${(props) => (props.active ? "#14b884" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  padding: 8px 16px;
  border: none;
  border-radius: 999px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.active
      ? "0 2px 6px rgba(0, 0, 0, 0.2)"
      : "0 1px 3px rgba(0,0,0,0.06)"};
  transition: all 0.2s ease;

  svg {
    font-size: 14px;
  }
`;

const Dropdown = styled.div`
  margin-left: auto;
  select {
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid #ccc;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  }
`;

const Questions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const QuestionCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 18px 20px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  align-items: flex-start;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  }
`;

const VoteBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const VoteBox = styled.div`
  background: #f7fafa;
  border-radius: 18px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: #14b884;
  font-weight: 600;
`;

const VoteCount = styled.span`
  font-size: 16px;
`;

const AnswerMeta = styled.div`
  background: #dcf5e8;
  padding: 4px 10px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #14b884;
  font-size: 13px;
`;

const AnswerTag = styled.div`
  display: flex;
  align-items: center;
`;

const AnswerCount = styled.div`
  display: flex;
  align-items: center;
`;

const Views = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #444;
  gap: 4px;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #111;
  margin-bottom: 4px;
`;

const Body = styled.p`
  color: #444;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const Tag = styled.span`
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 10px;
  font-size: 12px;
  color: #333;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #666;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Avatar = styled.div`
  width: 24px;
  height: 24px;
  background: #ddd;
  border-radius: 50%;
`;

const ExpandedContent = styled.div`
  margin-top: 16px;
  background: #f7fafd;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
`;

const AnswerBox = styled.div`
  background: #fff;
  border-left: 4px solid #14b884;
  padding: 16px;
  margin-bottom: 16px;

  pre {
    white-space: pre-wrap;
    font-size: 13px;
    line-height: 1.5;
    color: #333;
    font-family: "Courier New", monospace;
  }
`;

const AuthorMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #444;

  strong {
    display: block;
    color: #111;
  }

  p {
    margin: 0;
    color: #777;
    font-size: 13px;
  }
`;
