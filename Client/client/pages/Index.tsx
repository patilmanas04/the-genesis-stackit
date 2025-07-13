import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Filter, TrendingUp, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionCard } from "@/components/QuestionCard";
import { userContext } from "../../context/userProvider";

export default function Index() {
  const context = useContext(userContext);
  const { getAllQuestions, getStaticalCounts } = context || {};
  const [selectedTab, setSelectedTab] = useState("latest");
  const [QuestionListData, setQuestionListData] = useState([]);
  const [countListData, setCountListData] = useState<any>([]);
  useEffect(() => {
    getAllQuestions?.().then((questions) => {
      setQuestionListData(questions);
    });
    getStaticalCounts?.().then((count) => {
      setCountListData(count.counts);
    });
  }, []);

  console.log(countListData);
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-stackit-primary/10 to-stackit-blue/10 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Every question has an answer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community of developers helping each other solve
              problems, share knowledge, and grow together.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-stackit-primary">
                <Users className="h-6 w-6" />
                <span className="text-2xl font-bold">
                  {countListData.totalUsers}
                </span>
              </div>
              <p className="text-muted-foreground">Active Members</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-stackit-blue">
                <TrendingUp className="h-6 w-6" />
                <span className="text-2xl font-bold">
                  {countListData.totalQuestions}
                </span>
              </div>
              <p className="text-muted-foreground">Questions Asked</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-stackit-success">
                <Clock className="h-6 w-6" />
                <span className="text-2xl font-bold">
                  {countListData.answeredQuestionPercentage}%
                </span>
              </div>
              <p className="text-muted-foreground">Questions Answered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Questions List */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-4 sm:mb-0">
                Latest Questions
              </h2>
              <div className="flex items-center gap-2">
                <Button
                  asChild
                  className="bg-stackit-primary hover:bg-stackit-primary/90"
                >
                  <Link to="/ask">
                    <Plus className="h-4 w-4 mr-2" />
                    Ask Question
                  </Link>
                </Button>
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-4">
                {QuestionListData.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                {QuestionListData.filter((q) => q.votes > 30).map(
                  (question) => (
                    <QuestionCard key={question.id} question={question} />
                  )
                )}
              </TabsContent>

              <TabsContent value="unanswered" className="space-y-4">
                {QuestionListData.filter((q) => !q.hasAcceptedAnswer).map(
                  (question) => (
                    <QuestionCard key={question.id} question={question} />
                  )
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Popular Tags */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "react",
                  "javascript",
                  "typescript",
                  "css",
                  "nodejs",
                  "python",
                  "docker",
                  "api",
                  "database",
                  "html",
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-stackit-accent/20 text-stackit-secondary hover:bg-stackit-accent/30 cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Community Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be respectful and constructive</li>
                <li>• Search before asking</li>
                <li>• Provide clear, detailed questions</li>
                <li>• Accept helpful answers</li>
                <li>• Help others when you can</li>
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium">New answer posted</p>
                  <p className="text-muted-foreground">
                    "How to optimize React performance"
                  </p>
                  <p className="text-xs text-muted-foreground">2 min ago</p>
                </div>
                <div>
                  <p className="font-medium">Question answered</p>
                  <p className="text-muted-foreground">
                    "Docker best practices"
                  </p>
                  <p className="text-xs text-muted-foreground">15 min ago</p>
                </div>
                <div>
                  <p className="font-medium">New question</p>
                  <p className="text-muted-foreground">"GraphQL vs REST API"</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
