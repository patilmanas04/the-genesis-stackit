import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Link2,
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Smile,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

const suggestedTags = [
  "javascript",
  "react",
  "typescript",
  "css",
  "html",
  "nodejs",
  "python",
  "docker",
  "api",
  "database",
  "mongodb",
  "postgresql",
  "express",
  "nextjs",
  "tailwindcss",
];

export default function AskQuestion() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const navigate = useNavigate();

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const handleCustomTagAdd = () => {
    if (
      customTag.trim() &&
      !selectedTags.includes(customTag.trim()) &&
      selectedTags.length < 5
    ) {
      setSelectedTags([...selectedTags, customTag.trim()]);
      setCustomTag("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the question to your API
    console.log({ title, description, tags: selectedTags });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Ask a Question
            </h1>
            <p className="text-muted-foreground">
              Get help from our community of developers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Title</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label
                      htmlFor="title"
                      className="text-sm text-muted-foreground mb-2 block"
                    >
                      Be specific and imagine you're asking a question to
                      another person
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g. How to center a div in CSS?"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="text-lg"
                      required
                    />
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Description</CardTitle>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsPreview(!isPreview)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {isPreview ? "Edit" : "Preview"}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <Label
                      htmlFor="description"
                      className="text-sm text-muted-foreground mb-4 block"
                    >
                      Include all the information someone would need to answer
                      your question
                    </Label>

                    {/* Rich Text Editor Toolbar */}
                    <TooltipProvider>
                      <div className="border rounded-t-md bg-muted/50 p-2 flex flex-wrap gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <Bold className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Bold</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <Italic className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Italic</TooltipContent>
                        </Tooltip>

                        <div className="w-px bg-border mx-1" />

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <List className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Bullet List</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <ListOrdered className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Numbered List</TooltipContent>
                        </Tooltip>

                        <div className="w-px bg-border mx-1" />

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <Link2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Insert Link</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <Image className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Insert Image</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <Smile className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Insert Emoji</TooltipContent>
                        </Tooltip>

                        <div className="w-px bg-border mx-1" />

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <AlignLeft className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Align Left</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <AlignCenter className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Align Center</TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" type="button">
                              <AlignRight className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Align Right</TooltipContent>
                        </Tooltip>
                      </div>
                    </TooltipProvider>

                    {/* Text Area */}
                    {isPreview ? (
                      <div className="border border-t-0 rounded-b-md p-4 min-h-[200px] bg-background">
                        <div className="prose prose-sm max-w-none">
                          {description ? (
                            <div className="whitespace-pre-wrap">
                              {description}
                            </div>
                          ) : (
                            <p className="text-muted-foreground italic">
                              Preview will appear here...
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <Textarea
                        id="description"
                        placeholder="Describe your problem in detail..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[200px] border-t-0 rounded-t-none focus-visible:ring-0"
                        required
                      />
                    )}
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Label className="text-sm text-muted-foreground mb-4 block">
                      Add up to 5 tags to describe what your question is about
                    </Label>

                    {/* Selected Tags */}
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-stackit-primary/10 text-stackit-primary hover:bg-stackit-primary/20"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => handleTagRemove(tag)}
                              className="ml-2 hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Add Custom Tag */}
                    <div className="flex gap-2 mb-4">
                      <Input
                        placeholder="Add a tag..."
                        value={customTag}
                        onChange={(e) => setCustomTag(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleCustomTagAdd();
                          }
                        }}
                        disabled={selectedTags.length >= 5}
                      />
                      <Button
                        type="button"
                        onClick={handleCustomTagAdd}
                        disabled={!customTag.trim() || selectedTags.length >= 5}
                      >
                        Add
                      </Button>
                    </div>

                    {/* Suggested Tags */}
                    <div>
                      <p className="text-sm font-medium mb-2">
                        Suggested tags:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {suggestedTags
                          .filter((tag) => !selectedTags.includes(tag))
                          .slice(0, 10)
                          .map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="cursor-pointer hover:bg-muted"
                              onClick={() => handleTagSelect(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-stackit-primary hover:bg-stackit-primary/90"
                    disabled={
                      !title.trim() ||
                      !description.trim() ||
                      selectedTags.length === 0
                    }
                  >
                    Post Your Question
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>

            {/* Sidebar Tips */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    How to ask a good question
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-medium">Search first</h4>
                    <p className="text-muted-foreground">
                      Check if your question has already been answered
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Be specific</h4>
                    <p className="text-muted-foreground">
                      Include details about what you tried and what didn't work
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Show your work</h4>
                    <p className="text-muted-foreground">
                      Include code samples, error messages, or screenshots
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Use proper tags</h4>
                    <p className="text-muted-foreground">
                      Choose tags that accurately describe your question
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Community Guidelines
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  <p>• Be respectful and constructive</p>
                  <p>• Don't ask for homework solutions</p>
                  <p>• Include minimal reproducible examples</p>
                  <p>• Accept helpful answers when appropriate</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
