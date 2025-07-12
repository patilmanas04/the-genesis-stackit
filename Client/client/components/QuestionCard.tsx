import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronUp,
  ChevronDown,
  MessageSquare,
  Eye,
  Clock,
  Check,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar?: string;
    reputation: number;
  };
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
  hasAcceptedAnswer?: boolean;
  isUserQuestion?: boolean;
}

interface QuestionCardProps {
  question: Question;
  isLoggedIn?: boolean;
}

export function QuestionCard({
  question,
  isLoggedIn = false,
}: QuestionCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [currentVotes, setCurrentVotes] = useState(question.votes);

  const handleVote = (voteType: "up" | "down") => {
    if (!isLoggedIn) return;

    let newVotes = currentVotes;
    let newUserVote: "up" | "down" | null = voteType;

    if (userVote === voteType) {
      // Remove vote
      newUserVote = null;
      newVotes = voteType === "up" ? currentVotes - 1 : currentVotes + 1;
    } else if (userVote === null) {
      // Add new vote
      newVotes = voteType === "up" ? currentVotes + 1 : currentVotes - 1;
    } else {
      // Change vote
      newVotes = voteType === "up" ? currentVotes + 2 : currentVotes - 2;
    }

    setUserVote(newUserVote);
    setCurrentVotes(newVotes);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 24 * 7) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Voting Section */}
          <div className="flex flex-col items-center space-y-2 min-w-[60px]">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-8 w-8 rounded-full",
                userVote === "up"
                  ? "bg-vote-up text-white hover:bg-vote-up/90"
                  : "hover:bg-vote-up/10 hover:text-vote-up",
                !isLoggedIn && "cursor-not-allowed opacity-50",
              )}
              onClick={() => handleVote("up")}
              disabled={!isLoggedIn}
            >
              <ChevronUp className="h-5 w-5" />
            </Button>

            <span
              className={cn(
                "text-lg font-semibold",
                currentVotes > 0 && "text-vote-up",
                currentVotes < 0 && "text-vote-down",
              )}
            >
              {currentVotes}
            </span>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "p-1 h-8 w-8 rounded-full",
                userVote === "down"
                  ? "bg-vote-down text-white hover:bg-vote-down/90"
                  : "hover:bg-vote-down/10 hover:text-vote-down",
                !isLoggedIn && "cursor-not-allowed opacity-50",
              )}
              onClick={() => handleVote("down")}
              disabled={!isLoggedIn}
            >
              <ChevronDown className="h-5 w-5" />
            </Button>
          </div>

          {/* Question Content */}
          <div className="flex-1">
            <div className="space-y-3">
              {/* Title */}
              <Link to={`/questions/${question.id}`} className="block">
                <h3 className="text-lg font-semibold text-foreground hover:text-stackit-primary transition-colors line-clamp-2">
                  {question.title}
                </h3>
              </Link>

              {/* Description Preview */}
              <p className="text-muted-foreground text-sm line-clamp-2">
                {question.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-stackit-accent/20 text-stackit-secondary hover:bg-stackit-accent/30"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Stats and Author */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="h-4 w-4" />
                    <span
                      className={cn(
                        question.hasAcceptedAnswer &&
                          "text-stackit-success font-medium",
                      )}
                    >
                      {question.answers} answers
                    </span>
                    {question.hasAcceptedAnswer && (
                      <Check className="h-4 w-4 text-stackit-success" />
                    )}
                  </div>

                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{question.views} views</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(question.createdAt)}</span>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={question.author.avatar}
                      alt={question.author.name}
                    />
                    <AvatarFallback className="bg-stackit-primary text-white text-xs">
                      {question.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      {question.author.name}
                    </span>
                    <span className="text-xs">
                      {question.author.reputation.toLocaleString()} rep
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
